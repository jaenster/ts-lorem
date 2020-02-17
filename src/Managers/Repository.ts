import {EntityFieldSymbol, EntityManager, EntityType} from "./EntityManager";
import {ColumnsSymbol, DBDrivable} from "..";
import {Column} from "../Model/Column";
import {Table} from "../Model/Table";

export const isNew = Symbol('isNew');
export const dirty = Symbol('dirty');
export const DBDriver = Symbol('db');

export class Repository<T> {
    private columns: Column[] = [];
    protected persistant: T[] = [];
    public model: EntityType;
    private readonly idColumn: Column;
    private cache: { model: T, lastUsed: number }[] = [];
    private interval;
    public table: Table;
    public [DBDriver]: DBDrivable[] = [];

    constructor(constructor: EntityType) {
        this.model = constructor;
        this.columns = constructor[ColumnsSymbol];
        this.idColumn = this.columns.find(el => el.id);
        delete constructor[ColumnsSymbol];
        this.interval = setInterval(this.cacheHandler.bind(this), 3 * 1000);
    }

    find(id): T {
        const model = this.model;

        const cached = this.idColumn && this.cache.find(el => el.model[this.idColumn.name] === id);
        if (cached) {
            cached.lastUsed = (new Date).getTime();
            return cached.model;
        }

        // @ts-ignore
        const instance: T = new model;

        instance[isNew] = false;
        instance[dirty] = {};
        model["toJSON"] = () => {
            return this.columns.reduce((acc, c) => acc[c.name] = model[c.name] && false || acc, {})
        };
        return instance;
    }

    async findByModel(modelT: object): Promise<T[]> {

        const collection: T[] = [];

        await Promise.all(this.table.connections
            .filter(({model}) => model === modelT) // Filter, only relations to M
            .map(async ({ column}) => {
                const instancesOfColumn = await this.findByColumn(column);
                collection.push(...instancesOfColumn);
            }));

        return collection;
    }

    findByColumn(column: Column) : T[] {
        //ToDo; generate query.
        return [];
    }

    persist(model: T) {
        if (!this.persistant.includes(model)) {
            this.persistant.push(model);

            model[dirty] = {};
            model[isNew] = true;
            model["toJSON"] = () => {
                return this.columns.reduce((acc, c) => (acc[c.name] = model[c.name]) && false || acc, {})
            };
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
                    if (typeof column.type === 'function' && column.type && ![String, Number, Boolean, Function, Array].includes(column.type)) {
                        if (!(value instanceof column.type)) {
                            const entity = EntityManager.getRepository(column.type);
                            value = entity.find(value);
                            return value;
                        }

                    }
                    return value;
                },
                set(v: any): boolean {
                    if (!column.validation || column.validation.validate(v)) {
                        if (typeof column.type === 'object' && column.type) {
                            if (v ! instanceof column.type) {
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