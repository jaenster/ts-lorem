import {EntityFieldSymbol, EntityManager, EntityType} from "./EntityManager";
import {ColumnsSymbol, DBDrivable} from "..";
import {Column} from "../Model/Column";
import {Table} from "../Model/Table";

export const isNew = Symbol('isNew');
export const dirty = Symbol('dirty');
export const DBDriver = Symbol('db');

export class Repository<T> {
    private columns: Column[] = [];
    protected persistent: T[] = [];
    public model: (new(...args) => T);
    private readonly idColumn: Column;
    private cache: { model: T, lastUsed: number }[] = [];
    private interval;
    public table: Table;
    public [DBDriver]: DBDrivable[] = [];

    constructor(constructor: EntityType) {
        //@ts-ignore <-- Its a constructor that results in T
        this.model = constructor;

        this.columns = constructor[ColumnsSymbol];
        delete constructor[ColumnsSymbol];
        this.idColumn = this.columns.find(el => el.id);

        this.interval = setInterval(this.cacheHandler.bind(this), 3 * 1000);
    }

    async find(id): Promise<T> {
        const model = this.model;

        const cached = this.idColumn && this.cache.find(el => el.model[this.idColumn.name] === id);
        if (cached) {
            cached.lastUsed = (new Date).getTime();
            return cached.model;
        }

        const driver: DBDrivable = this[DBDriver][0];
        try {
            const partial = await driver.find<T>(this, id);
            const instance: T = new model;
            instance[isNew] = false;
            instance[dirty] = {};
            this.setupJSON(model);

            // setup inner fields
            Object.assign(instance, partial);

            return instance;

        } catch (e) {
            throw new Error('Failed to fetch model');
        }

    }

    private setupJSON(model) {
        model["toJSON"] = () => {
            return this.columns.reduce((acc, c) => {
                if (c.type && c.type.hasOwnProperty(EntityFieldSymbol)) {

                    const repo: Repository<typeof c.type> = c.type[EntityFieldSymbol] as Repository<typeof c.type>,
                        idField = repo.columns.filter(column => column.id)[0]; // get name of id field

                    if (idField) {
                        acc[c.name] = model[c.name][idField.name]; // use name of id field
                        return acc;
                    }
                }
                acc[c.name] = model[c.name];
                return acc;
            }, {})
        };
    }

    async findByModel(modelT: object): Promise<T[]> {

        const collection: T[] = [];

        await Promise.all(this.table.connections
            .filter(({model}) => model === modelT) // Filter, only relations to M
            .map(async ({column}) => {
                const instancesOfColumn = await this.findByColumn(column,modelT);
                collection.push(...instancesOfColumn);
            }));

        return collection;
    }

    findByColumn(column: Column, model: {[column.name] : any}): T[] {
        //ToDo; generate query.
        return [];
    }

    persist(model: T) {
        if (!this.persistent.includes(model)) {
            this.persistent.push(model);

            model[dirty] = {};
            model[isNew] = true;
            this.setupJSON(model);
            this.writeColumnProxies(model);
        }
    }

    async flush() {
        return await Promise.all(this[DBDriver].map(async driver => await driver.flush(this)));
    }

    private writeColumnProxies(model: T) {
        if (!this.cache.find(el => el.model = model)) {
            const cacheProxy = {model, lastUsed: null};
            let time: number = (new Date).getTime();
            Object.defineProperty(cacheProxy, 'lastUsed', {
                get(): any {
                    return time;
                },
                set(v: number): void {
                    time = v;
                }
            });
            this.cache.push(cacheProxy);
        }
        this.columns.forEach(column => {
            let value = model[column.name];
            Object.defineProperty(model, column.name, {
                get(): any {
                    const constructor = column.model.constructor as (new (...args: any[]) => T);
                    if (typeof constructor === 'function' && column.type && ![String, Number, Boolean, Function, Array].includes(column.type)) {
                        if (!(value instanceof constructor)) {
                            const entity = EntityManager.getRepository(constructor);
                            value = entity.find(value);
                            return value;
                        }

                    }
                    return value;
                },
                set(v: any): boolean {
                    if (!column.validation || column.validation.validate(v)) {
                        if (typeof column.model === 'function' && column.model) {
                            if (v ! instanceof column.model) {
                                throw new TypeError('Wrong type of value.')
                            }
                        }
                        if (value !== v && !model[dirty][column.name]) {
                            model[dirty][column.name] = value;
                        }
                        return value = v;
                    }
                    return false;
                }
            });
        })
    }

    private cacheHandler() {
        const currentTime = (new Date).getTime();
        for (let i = this.cache.length - 1; i >= 0; i--) if (this.cache[i]) {
            const time = this.cache[i].lastUsed;
            if (currentTime - time > 1 * 1000 * 3) { // If didnt use for 3 minutes, clean up
                this.cache.splice(i, 1);
            }
        }
    }
}