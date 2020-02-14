import {Validator} from "../Annotation/Validator";
import {ColumnSettings} from "../Annotation/Column";

export class Column implements ColumnSettings{
    public name: string;
    public id: boolean;
    public validation: Validator;
    public type: any;
    constructor(init?:Partial<Column>) {
        Object.assign(this, init)
    }
}