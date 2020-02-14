import { Validatable } from "./Validatable";
export interface Validator {
    validate(what: Validatable): any;
}
