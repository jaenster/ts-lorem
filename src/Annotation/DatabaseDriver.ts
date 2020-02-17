import {DataBase} from "../Model/DataBase";
import {DBDrivable} from "..";

type DriverSettings = {
    name: string,
    [data: string]: any,
};

const defaultSettings: DriverSettings = {
    name: '',
};

export function DatabaseDriver(settings: Partial<DriverSettings>) {

    const config: DriverSettings = Object.assign({}, defaultSettings, settings);

    // Class that results in a DBDrivable
    return function <M extends (new(...args) => DBDrivable)>(constructor: M) {
        DataBase.drivers.push(new constructor);
    }
}