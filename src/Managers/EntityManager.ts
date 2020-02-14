import {repository} from "./Repository";

export type EntityType = { new(...args: any[]): { [EntityField]?: repository<any> } };

const EntityField = Symbol('EntityManager');
export default class EntityManager<M> {
    static classes: EntityType[] = [];

    static register(constructor: EntityType) {
        if (!EntityManager.classes.includes(constructor)) {
            constructor[EntityField] = new repository<typeof constructor>(constructor);

            EntityManager.classes.push(constructor);
        }

    }

    static getRepository<T extends Object>(type: (new (...args: any[]) => T)): repository<T> {
        const index = EntityManager.classes.indexOf(type);
        if (index === -1) {
            throw new Error('No such entity found');
        }

        return EntityManager.classes[index][EntityField];
    }

}