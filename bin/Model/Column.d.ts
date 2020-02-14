import { Validator } from "../Annotation/Validator";
import { ColumnSettings } from "../Annotation/Column";
import { Class } from "../Types/Class";
export declare class Column implements ColumnSettings {
    name: string;
    id: boolean;
    validation: Validator;
    type: any;
    model: Class;
    constructor(init?: Partial<Column>);
}
