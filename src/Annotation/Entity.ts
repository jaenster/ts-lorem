import EntityManager from "../Managers/EntityManager";
import {Class} from "../Types/Class";
import {Repository} from "../Managers/Repository";

export type EntityOptions = {
    repository?: Repository<any> | Class,
    tabel?: string,
};

const defasultSettings: EntityOptions = {
    repository: Repository,
    tabel: null,
};

export default function Entity(settings: EntityOptions = {}) {
    const config = Object.assign({}, defasultSettings, settings);
    /**
     * @param constructor
     * @constructor
     */
    return function <T extends { new(...args: any[]): {} }>(constructor: T) {
        if (!config.tabel) {
            config.tabel = constructor.name.replace(/(?<!^)[A-Z]/g, key => '_'+key.toLowerCase()).toLowerCase();
        }
        EntityManager.register(constructor, config)
    }
}