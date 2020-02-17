"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Repository_1 = require("./Repository");
const Table_1 = require("../Model/Table");
const DataBase_1 = require("../Model/DataBase");
exports.EntityFieldSymbol = Symbol('EntityManager');
class EntityManager {
    static register(constructor, settings) {
        if (!EntityManager.classes.includes(constructor)) {
            let RepoClass = settings.repository, RepoInstance = new RepoClass(constructor);
            constructor[exports.EntityFieldSymbol] = RepoInstance;
            RepoInstance.table = new Table_1.Table({ name: settings.tabel, columns: RepoInstance.columns });
            EntityManager.classes.push(constructor);
            (settings.databaseDriver || DataBase_1.DataBase.drivers[0]) && RepoInstance[Repository_1.DBDriver].push(settings.databaseDriver || DataBase_1.DataBase.drivers[0]);
        }
    }
    static getRepository(type) {
        const index = EntityManager.classes.indexOf(type);
        if (index === -1) {
            throw new Error('No such entity found');
        }
        return EntityManager.classes[index][exports.EntityFieldSymbol];
    }
}
exports.EntityManager = EntityManager;
EntityManager.classes = [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW50aXR5TWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9NYW5hZ2Vycy9FbnRpdHlNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkNBQWtEO0FBRWxELDBDQUFxQztBQUNyQyxnREFBMkM7QUFJOUIsUUFBQSxpQkFBaUIsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7QUFFekQsTUFBYSxhQUFhO0lBR3RCLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBdUIsRUFBRSxRQUF1QjtRQUM1RCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFFOUMsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLFVBQW9DLEVBRXpELFlBQVksR0FBRyxJQUFJLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUU5QyxXQUFXLENBQUMseUJBQWlCLENBQUMsR0FBRyxZQUFZLENBQUM7WUFFOUMsWUFBWSxDQUFDLEtBQUssR0FBRyxJQUFJLGFBQUssQ0FBQyxFQUFDLElBQUksRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxZQUFZLENBQUMsT0FBTyxFQUFtQixDQUFDLENBQUM7WUFFeEcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFeEMsQ0FBQyxRQUFRLENBQUMsY0FBYyxJQUFJLG1CQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksWUFBWSxDQUFDLHFCQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsSUFBSSxtQkFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ25JO0lBQ0wsQ0FBQztJQUVELE1BQU0sQ0FBQyxhQUFhLENBQW1CLElBQWlDO1FBQ3BFLE1BQU0sS0FBSyxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xELElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ2QsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1NBQzNDO1FBRUQsT0FBTyxhQUFhLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLHlCQUFpQixDQUFDLENBQUM7SUFDM0QsQ0FBQzs7QUEzQkwsc0NBNEJDO0FBM0JVLHFCQUFPLEdBQWlCLEVBQUUsQ0FBQyJ9