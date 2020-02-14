import { Validator } from "./Validator";
import "reflect-metadata";
declare type propertyKey = string;
export interface ColumnSettings {
    validation?: Validator;
    reference?: propertyKey;
    [data: string]: any | any[];
}
export declare const ColumnsSymbol: unique symbol;
export declare function Column(settings?: ColumnSettings): (target: any, propertyKey: string) => void;
export {};
