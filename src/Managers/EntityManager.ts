import {Repository} from "./Repository";
import {EntityOptions} from "../Annotation/Entity";
import {Class} from "../Types/Class";
import {Table} from "../Model/Table";

export type EntityType = { new(...args: any[]): { [EntityFieldSymbol]?: Repository<any> } };

export const EntityFieldSymbol = Symbol('EntityManager');
export default class EntityManager<T> {
    static classes: EntityType[] = [];

    static register(constructor: EntityType, settings: EntityOptions) {
        if (!EntityManager.classes.includes(constructor)) {

            let RepoClass = settings.repository as Repository<EntityType>,
                //@ts-ignore
                RepoInstance = new RepoClass(constructor);

            constructor[EntityFieldSymbol] = RepoInstance;

            RepoInstance.table = new Table({name: settings.tabel,columns: RepoInstance.columns} as Partial<Table>);

            EntityManager.classes.push(constructor);
        }
    }

    static getRepository<T extends Object>(type: (new (...args: any[]) => T)): Repository<T> {
        const index = EntityManager.classes.indexOf(type);
        if (index === -1) {
            throw new Error('No such entity found');
        }

        return EntityManager.classes[index][EntityFieldSymbol];
    }

}