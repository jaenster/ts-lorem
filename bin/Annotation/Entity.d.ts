import { Class } from "..";
import { Repository } from "../Managers/Repository";
export declare type EntityOptions = {
    repository?: Repository<any> | Class;
    tabel?: string;
};
export declare function Entity(settings?: EntityOptions): <T extends new (...args: any[]) => {}>(constructor: T) => void;
