import { Repository } from "./Repository";
import { EntityOptions } from "..";
export declare type EntityType = {
    new (...args: any[]): {
        [EntityFieldSymbol]?: Repository<any>;
    };
};
export declare const EntityFieldSymbol: unique symbol;
export declare class EntityManager<T> {
    static classes: EntityType[];
    static register(constructor: EntityType, settings: EntityOptions): void;
    static getRepository<T extends Object>(type: (new (...args: any[]) => T)): Repository<T>;
}
