import {EntityFieldSymbol, EntityType} from "../Managers/EntityManager";
import {Repository} from "../Managers/Repository";
import {Class} from "../Types/Class";
import ArrayImposer from "./ArrayImposer";

export default class Collection<T> extends ArrayImposer<T>{
    private model: Class;

    static async from<T extends EntityType>(modelT: (new (...args: any[]) => T)): Promise<Collection<T>> {

        const collection = new Collection<T>();
        collection.model = modelT;

        const repo = modelT[EntityFieldSymbol] as Repository<T>;

        await Promise.all(repo.table.connections
            .filter(({model}) => model === modelT) // Filter, only relations to M
            .map(async ({model, column}) => {
                const instancesOfColumn = await repo.findByColumn(column);
                collection.push(...instancesOfColumn);
            }));

        return collection;
    }

    [n: number]: T;
}