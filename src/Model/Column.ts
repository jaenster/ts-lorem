import {Validator} from "../Annotation/Validator";
import {ColumnSettings} from "../Annotation/Column";
import EntityManager, {EntityFieldSymbol} from "../Managers/EntityManager";
import {Repository} from "../Managers/Repository";
import {Class} from "../Types/Class";

export class Column implements ColumnSettings{
    public name: string;
    public id: boolean;
    public validation: Validator;
    public type: any;
    public model: Class;
    constructor(init?:Partial<Column>) {
        Object.assign(this, init);
        const type = this.type;

        // We reference to another table, this is already created otherwise we dont appear here.
        // So, to do this correctly
        if (typeof type === 'function' && type.hasOwnProperty(EntityFieldSymbol)) {
            const repo = type[EntityFieldSymbol];
            (repo as Repository<typeof type>).table.referencedOn({model: this.model, column: this,})

        }
    }
}