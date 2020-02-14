import { EntityType } from "./EntityManager";
import { Column } from "../Model/Column";
import { Table } from "../Model/Table";
export declare const isNew: unique symbol;
export declare const dirty: unique symbol;
export declare class Repository<T> {
    private columns;
    protected persistant: T[];
    model: EntityType;
    private readonly idColumn;
    private cache;
    private interval;
    table: Table;
    constructor(constructor: EntityType);
    find(id: any): T;
    findByModel(modelT: object): Promise<T[]>;
    findByColumn(column: Column): T[];
    persist(model: T): void;
    private writeColumnProxies;
    private cacheHandler;
}
