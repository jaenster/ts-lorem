"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EntityManager_1 = require("../Managers/EntityManager");
const ArrayImposer_1 = require("./ArrayImposer");
class Collection extends ArrayImposer_1.default {
    static async from(modelT) {
        const collection = new Collection();
        collection.model = modelT;
        const repo = modelT[EntityManager_1.EntityFieldSymbol];
        await Promise.all(repo.table.connections
            .filter(({ model }) => model === modelT)
            .map(async ({ model, column }) => {
            const instancesOfColumn = await repo.findByColumn(column);
            collection.push(...instancesOfColumn);
        }));
        return collection;
    }
}
exports.default = Collection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29sbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Nb2RlbC9Db2xsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkRBQXdFO0FBR3hFLGlEQUEwQztBQUUxQyxNQUFxQixVQUFjLFNBQVEsc0JBQWU7SUFHdEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQXVCLE1BQW1DO1FBRXZFLE1BQU0sVUFBVSxHQUFHLElBQUksVUFBVSxFQUFLLENBQUM7UUFDdkMsVUFBVSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7UUFFMUIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLGlDQUFpQixDQUFrQixDQUFDO1FBRXhELE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVc7YUFDbkMsTUFBTSxDQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxLQUFLLE1BQU0sQ0FBQzthQUNyQyxHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUMsS0FBSyxFQUFFLE1BQU0sRUFBQyxFQUFFLEVBQUU7WUFDM0IsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUQsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLGlCQUFpQixDQUFDLENBQUM7UUFDMUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVSLE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7Q0FHSjtBQXJCRCw2QkFxQkMifQ==