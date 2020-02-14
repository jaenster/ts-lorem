import {Repository} from "../src/Managers/Repository";

export default class BaseModelRepository<T> extends Repository<T> {
    customGetter() {

    }
    constructor(prop) {
        super(prop);
    }
}