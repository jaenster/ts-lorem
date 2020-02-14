import { EntityType } from "../Managers/EntityManager";
import ArrayImposer from "./ArrayImposer";
export default class Collection<T> extends ArrayImposer<T> {
    private model;
    static from<T extends EntityType>(modelT: (new (...args: any[]) => T)): Promise<Collection<T>>;
    [n: number]: T;
}
