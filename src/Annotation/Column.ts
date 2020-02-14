import {Validator} from "./Validator";
import "reflect-metadata";
import {EntityType} from "../Managers/EntityManager";
import {Class} from "../Types/Class";
import {Column} from "../Model/Column";

type propertyKey = string;
export interface ColumnSettings {
    validation?: Validator,
    reference?: propertyKey,
    [data: string]: any | any[];
}

export const ColumnsSymbol = Symbol('Columns');
const defaultSettings: ColumnSettings = {};

export default function (settings: ColumnSettings = {}) {
    const config = Object.assign({}, defaultSettings, settings);
    return (target: any, propertyKey: string) => {
        config.name = propertyKey;
        config.type = Reflect.getMetadata('design:type', target, propertyKey);
        // Target is a class with ColumnSettings array
        const constructor: EntityType = target.constructor as Class & { [ColumnsSymbol]?: ColumnSettings[] };

        if (!constructor[ColumnsSymbol]) constructor[ColumnsSymbol] = [];

        constructor[ColumnsSymbol].push(new Column(config));
    }
}
