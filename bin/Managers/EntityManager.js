"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Table_1 = require("../Model/Table");
exports.EntityFieldSymbol = Symbol('EntityManager');
class EntityManager {
    static register(constructor, settings) {
        if (!EntityManager.classes.includes(constructor)) {
            let RepoClass = settings.repository, RepoInstance = new RepoClass(constructor);
            constructor[exports.EntityFieldSymbol] = RepoInstance;
            RepoInstance.table = new Table_1.Table({ name: settings.tabel, columns: RepoInstance.columns });
            EntityManager.classes.push(constructor);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW50aXR5TWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9NYW5hZ2Vycy9FbnRpdHlNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsMENBQXFDO0FBSXhCLFFBQUEsaUJBQWlCLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ3pELE1BQWEsYUFBYTtJQUd0QixNQUFNLENBQUMsUUFBUSxDQUFDLFdBQXVCLEVBQUUsUUFBdUI7UUFDNUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBRTlDLElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxVQUFvQyxFQUV6RCxZQUFZLEdBQUcsSUFBSSxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFOUMsV0FBVyxDQUFDLHlCQUFpQixDQUFDLEdBQUcsWUFBWSxDQUFDO1lBRTlDLFlBQVksQ0FBQyxLQUFLLEdBQUcsSUFBSSxhQUFLLENBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLEtBQUssRUFBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLE9BQU8sRUFBbUIsQ0FBQyxDQUFDO1lBRXZHLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQzNDO0lBQ0wsQ0FBQztJQUVELE1BQU0sQ0FBQyxhQUFhLENBQW1CLElBQWlDO1FBQ3BFLE1BQU0sS0FBSyxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xELElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ2QsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1NBQzNDO1FBRUQsT0FBTyxhQUFhLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLHlCQUFpQixDQUFDLENBQUM7SUFDM0QsQ0FBQzs7QUF6Qkwsc0NBMkJDO0FBMUJVLHFCQUFPLEdBQWlCLEVBQUUsQ0FBQyJ9