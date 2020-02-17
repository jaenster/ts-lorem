import {DBDriver, Repository} from "./Repository";
import {DatabaseDriver, EntityOptions} from "..";
import {Table} from "../Model/Table";
import {DataBase} from "../Model/DataBase";

export type EntityType = { new(...args: any[]): { [EntityFieldSymbol]?: Repository<any> } };

export const EntityFieldSymbol = Symbol('EntityManager');

export class EntityManager<T> {
    static classes: EntityType[] = [];

    static register(constructor: EntityType, settings: EntityOptions) {
        if (!EntityManager.classes.includes(constructor)) {

            let RepoClass = settings.repository as Repository<EntityType>,
                //@ts-ignore
                RepoInstance = new RepoClass(constructor);

            constructor[EntityFieldSymbol] = RepoInstance;

            RepoInstance.table = new Table({name: settings.tabel, columns: RepoInstance.columns} as Partial<Table>);

            EntityManager.classes.push(constructor);

            (settings.databaseDriver || DataBase.drivers[0]) && RepoInstance[DBDriver].push(settings.databaseDriver || DataBase.drivers[0]);
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