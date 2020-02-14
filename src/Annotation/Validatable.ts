export interface Validatable {
    getValue():Promise<any|any[]>;
}