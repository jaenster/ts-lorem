import {Validator} from "../Annotation/Validator";
import {Class} from "../Types/Class";
import {Column} from "./Column";


type Connection = { model: Class, column: Column }

export class Table {
    public name: string; // Database name
    public connections: Connection[] = [];
    public columns: Column[] = [];
    static instances = [];

    constructor(init?: Partial<Table>) {
        Object.assign(this, init);
        
        Table.instances.push(this);
    }

    referencedOn(connection: Connection) {
        this.connections.push(connection);
    }
}