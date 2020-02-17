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
    find(id) {
        const model = this.model;
        const cached = this.idColumn && this.cache.find(el => el.model[this.idColumn.name] === id);
        if (cached) {
            cached.lastUsed = (new Date).getTime();
            return cached.model;
        }
        const instance = new model;
        instance[exports.isNew] = false;
        instance[exports.dirty] = {};
        model["toJSON"] = () => {
            return this.columns.reduce((acc, c) => acc[c.name] = model[c.name] && false || acc, {});
        };
        return instance;
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
            model["toJSON"] = () => {
                return this.columns.reduce((acc, c) => (acc[c.name] = model[c.name]) && false || acc, {});
            };
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
                    if (typeof column.type === 'function' && column.type && ![String, Number, Boolean, Function, Array].includes(column.type)) {
                        if (!(value instanceof column.type)) {
                            const entity = EntityManager_1.EntityManager.getRepository(column.type);
                            value = entity.find(value);
                            return value;
                        }
                    }
                    return value;
                },
                set(v) {
                    if (!column.validation || column.validation.validate(v)) {
                        if (typeof column.type === 'object' && column.type) {
                            if (v instanceof column.type) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVwb3NpdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9NYW5hZ2Vycy9SZXBvc2l0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1EQUE2RTtBQUM3RSwwQkFBNkM7QUFJaEMsUUFBQSxLQUFLLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3hCLFFBQUEsS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN4QixRQUFBLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFckMsTUFBYSxVQUFVO0lBVW5CLFlBQVksV0FBdUI7UUFUM0IsWUFBTyxHQUFhLEVBQUUsQ0FBQztRQUNyQixlQUFVLEdBQVEsRUFBRSxDQUFDO1FBR3ZCLFVBQUssR0FBcUMsRUFBRSxDQUFDO1FBRzlDLFFBQVUsR0FBaUIsRUFBRSxDQUFDO1FBR2pDLElBQUksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDLGlCQUFhLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQy9DLE9BQU8sV0FBVyxDQUFDLGlCQUFhLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVELElBQUksQ0FBQyxFQUFFO1FBQ0gsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUV6QixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFD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