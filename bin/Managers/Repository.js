"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const EntityManager_1 = require("./EntityManager");
const __1 = require("..");
exports.isNew = Symbol('isNew');
exports.dirty = Symbol('dirty');
exports.DBDriver = Symbol('db');
class Repository {
    constructor(constructor) {
        this.columns = [];
        this.persistant = [];
        this.cache = [];
        this[_a] = [];
        this.model = constructor;
        this.columns = constructor[__1.ColumnsSymbol];
        this.idColumn = this.columns.find(el => el.id);
        delete constructor[__1.ColumnsSymbol];
        this.interval = setInterval(this.cacheHandler.bind(this), 3 * 1000);
    }
    async find(id) {
        const model = this.model;
        const cached = this.idColumn && this.cache.find(el => el.model[this.idColumn.name] === id);
        if (cached) {
            cached.lastUsed = (new Date).getTime();
            return cached.model;
        }
        const driver = this[exports.DBDriver][0];
        try {
            const partial = await driver.find(id);
            const instance = new model;
            instance[exports.isNew] = false;
            instance[exports.dirty] = {};
            this.setupJSON(model);
            Object.assign(instance, partial);
            return instance;
        }
        catch (e) {
            throw new Error('Failed to fetch model');
        }
    }
    setupJSON(model) {
        model["toJSON"] = () => {
            return this.columns.reduce((acc, c) => {
                if (c.type && c.type.hasOwnProperty(EntityManager_1.EntityFieldSymbol)) {
                    const type = c.type;
                    const repo = c.type[EntityManager_1.EntityFieldSymbol];
                    const idField = repo.columns.filter(column => column.id)[0];
                    if (idField) {
                        acc[c.name] = model[c.name][idField.name];
                        console.log(acc);
                        return acc;
                    }
                }
                acc[c.name] = model[c.name];
                return acc;
            }, {});
        };
    }
    async findByModel(modelT) {
        const collection = [];
        await Promise.all(this.table.connections
            .filter(({ model }) => model === modelT)
            .map(async ({ column }) => {
            const instancesOfColumn = await this.findByColumn(column);
            collection.push(...instancesOfColumn);
        }));
        return collection;
    }
    findByColumn(column) {
        return [];
    }
    persist(model) {
        if (!this.persistant.includes(model)) {
            this.persistant.push(model);
            model[exports.dirty] = {};
            model[exports.isNew] = true;
            this.setupJSON(model);
            this.writeColumnProxies(model);
        }
    }
    async flush() {
        return await Promise.all(this[exports.DBDriver].map(async (driver) => await driver.flush(this)));
    }
    writeColumnProxies(model) {
        if (!this.cache.find(el => el.model = model)) {
            const cacheProxy = { model, lastUsed: null };
            let time = (new Date).getTime();
            Object.defineProperty(cacheProxy, 'lastUsed', {
                get() {
                    return time;
                },
                set(v) {
                    time = v;
                }
            });
            this.cache.push(cacheProxy);
        }
        this.columns.forEach(column => {
            let value = model[column.name];
            Object.defineProperty(model, column.name, {
                get() {
                    const constructor = column.model.constructor;
                    if (typeof constructor === 'function' && column.type && ![String, Number, Boolean, Function, Array].includes(column.type)) {
                        if (!(value instanceof constructor)) {
                            const entity = EntityManager_1.EntityManager.getRepository(constructor);
                            value = entity.find(value);
                            return value;
                        }
                    }
                    return value;
                },
                set(v) {
                    if (!column.validation || column.validation.validate(v)) {
                        if (typeof column.model === 'function' && column.model) {
                            if (v instanceof column.model) {
                                throw new TypeError('Wrong type of value.');
                            }
                        }
                        if (value !== v && !model[exports.dirty][column.name]) {
                            model[exports.dirty][column.name] = value;
                        }
                        return value = v;
                    }
                    return false;
                }
            });
        });
    }
    cacheHandler() {
        const currentTime = (new Date).getTime();
        for (let i = this.cache.length - 1; i >= 0; i--)
            if (this.cache[i]) {
                const time = this.cache[i].lastUsed;
                if (currentTime - time > 1 * 1000 * 3) {
                    this.cache.splice(i, 1);
                }
            }
    }
}
exports.Repository = Repository;
_a = exports.DBDriver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVwb3NpdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9NYW5hZ2Vycy9SZXBvc2l0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1EQUE2RTtBQUM3RSwwQkFBNkM7QUFJaEMsUUFBQSxLQUFLLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3hCLFFBQUEsS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN4QixRQUFBLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFckMsTUFBYSxVQUFVO0lBVW5CLFlBQVksV0FBdUI7UUFUM0IsWUFBTyxHQUFhLEVBQUUsQ0FBQztRQUNyQixlQUFVLEdBQVEsRUFBRSxDQUFDO1FBR3ZCLFVBQUssR0FBcUMsRUFBRSxDQUFDO1FBRzlDLFFBQVUsR0FBaUIsRUFBRSxDQUFDO1FBSWpDLElBQUksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDLGlCQUFhLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQy9DLE9BQU8sV0FBVyxDQUFDLGlCQUFhLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVELEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNULE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFFekIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFD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