import { Class } from "../Types/Class";
import { Column } from "./Column";
declare type Connection = {
    model: Class;
    column: Column;
};
export declare class Table {
    name: string;
    connections: Connection[];
    columns: Column[];
    static instances: any[];
    constructor(init?: Partial<Table>);
    referencedOn(connection: Connection): void;
}
export {};
