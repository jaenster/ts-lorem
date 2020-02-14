"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EntityManager_1 = require("./EntityManager");
const __1 = require("..");
exports.isNew = Symbol('isNew');
exports.dirty = Symbol('dirty');
class Repository {
    constructor(constructor) {
        this.columns = [];
        this.persistant = [];
        this.cache = [];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVwb3NpdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9NYW5hZ2Vycy9SZXBvc2l0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQTZFO0FBQzdFLDBCQUFpQztBQUlwQixRQUFBLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDeEIsUUFBQSxLQUFLLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBRXJDLE1BQWEsVUFBVTtJQVNuQixZQUFZLFdBQXVCO1FBUjNCLFlBQU8sR0FBYSxFQUFFLENBQUM7UUFDckIsZUFBVSxHQUFRLEVBQUUsQ0FBQztRQUd2QixVQUFLLEdBQXFDLEVBQUUsQ0FBQztRQUtqRCxJQUFJLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztRQUN6QixJQUFJLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQyxpQkFBYSxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMvQyxPQUFPLFdBQVcsQ0FBQyxpQkFBYSxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFRCxJQUFJLENBQUMsRUFBRTtRQUNILE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFFekIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FB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