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
        this.persistent = [];
        this.cache = [];
        this[_a] = [];
        this.model = constructor;
        this.columns = constructor[__1.ColumnsSymbol];
        delete constructor[__1.ColumnsSymbol];
        this.idColumn = this.columns.find(el => el.id);
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
            const partial = await driver.find(this, id);
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
                    const repo = c.type[EntityManager_1.EntityFieldSymbol], idField = repo.columns.filter(column => column.id)[0];
                    if (idField) {
                        acc[c.name] = model[c.name][idField.name];
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
        const driver = this[exports.DBDriver][0];
        const repo = modelT.constructor[EntityManager_1.EntityFieldSymbol];
        await Promise.all(this.table.connections
            .filter(({ model }) => model instanceof modelT.constructor)
            .map(async ({ column }) => {
            const instancesOfColumn = await driver.findByColumn(this, { [column.name]: modelT[repo.idColumn.name] });
            collection.push(...instancesOfColumn);
        }));
        return collection;
    }
    persist(model) {
        if (!this.persistent.includes(model)) {
            this.persistent.push(model);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVwb3NpdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9NYW5hZ2Vycy9SZXBvc2l0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1EQUE2RTtBQUM3RSwwQkFBb0Q7QUFJdkMsUUFBQSxLQUFLLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3hCLFFBQUEsS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN4QixRQUFBLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFckMsTUFBYSxVQUFVO0lBVW5CLFlBQVksV0FBdUI7UUFUM0IsWUFBTyxHQUFhLEVBQUUsQ0FBQztRQUNyQixlQUFVLEdBQVEsRUFBRSxDQUFDO1FBR3ZCLFVBQUssR0FBcUMsRUFBRSxDQUFDO1FBRzlDLFFBQVUsR0FBaUIsRUFBRSxDQUFDO1FBSWpDLElBQUksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDO1FBRXpCLElBQUksQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDLGlCQUFhLENBQUMsQ0FBQztRQUMxQyxPQUFPLFdBQVcsQ0FBQyxpQkFBYSxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUUvQyxJQUFJLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVELEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNULE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFFekIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFD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