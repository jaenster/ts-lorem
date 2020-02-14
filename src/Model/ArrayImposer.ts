export default class ArrayImposer<T> implements ArrayLike<T>, Array<T>{
    private innerArray: T[] = [];
    public length: number; // Overridden @ defined properly below
    push(...args) {
        return this.innerArray.push.apply(this.innerArray, args);
    }

    pop(...args) {
        return this.innerArray.pop.apply(this.innerArray, args);
    }


    [n: number]: T;

    [Symbol.iterator](): IterableIterator<T> {
        return undefined;
    }

    [Symbol.unscopables](): { copyWithin: boolean; entries: boolean; fill: boolean; find: boolean; findIndex: boolean; keys: boolean; values: boolean } {
        return {
            copyWithin: false,
            entries: false,
            fill: false,
            find: false,
            findIndex: false,
            keys: false,
            values: false
        };
    }

    concat(...items: ConcatArray<T>[]): T[];
    concat(...items: (ConcatArray<T> | T)[]): T[];
    concat(...items: (ConcatArray<T> | T)[]): T[] {
        return this.innerArray.concat.apply(this.innerArray);
    }

    copyWithin(target: number, start: number, end?: number): this {
        return this.innerArray.copyWithin.apply(this.innerArray,arguments)
    }

    entries(): IterableIterator<[number, T]> {
        return this.innerArray.entries.apply(this.innerArray,arguments)
    }

    //@ts-ignore
    every(callbackfn: <T>(value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean {
        return this.innerArray.every.apply(this.innerArray,arguments)
    }

    fill(value: T, start?: number, end?: number): this {
        return this.innerArray.fill.apply(this.innerArray,arguments)
    }

    //@ts-ignore
    filter<S extends T>(callbackfn: <T>(value: T, index: number, array: T[]) => value is S, thisArg?: any): S[];
    filter(callbackfn: <T>(value: T, index: number, array: T[]) => unknown, thisArg?: any): T[];
    filter(callbackfn, thisArg?: any): any {
    }

    //@ts-ignore
    find<S extends T>(predicate: <T>(this: void, value: T, index: number, obj: T[]) => value is S, thisArg?: any): S | undefined;
    find(predicate: <T>(value: T, index: number, obj: T[]) => unknown, thisArg?: any): T | undefined;
    find(predicate, thisArg?: any): any {
    }

    //@ts-ignore
    findIndex(predicate: <T>(value: T, index: number, obj: T[]) => unknown, thisArg?: any): number {
        return this.innerArray.findIndex.apply(this.innerArray,arguments)
    }

    flat<U>(depth: 7): U[];
    flat<U>(depth: 6): U[];
    flat<U>(depth: 5): U[];
    flat<U>(depth: 4): U[];
    flat<U>(depth: 3): U[];
    flat<U>(depth: 2): U[];
    flat<U>(depth?: 1): U[];
    flat<U>(depth: 0): U[];
    flat<U>(depth?: number): any[];
    flat(depth?: 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | number): any {
    }

    // @ts-ignore
    flatMap<U, This = undefined>(callback: <T>(this: This, value: T, index: number, array: T[]) => (ReadonlyArray<U> | U), thisArg?: This): U[] {
        return this.innerArray.flatMap.apply(this.innerArray,arguments);
    }

    // @ts-ignore
    forEach(callbackfn: <T>(value: T, index: number, array: T[]) => void, thisArg?: any): void {
    }

    includes(searchElement: T, fromIndex?: number): boolean {
        return this.innerArray.includes.apply(this.innerArray,arguments)
    }

    indexOf(searchElement: T, fromIndex?: number): number {
        return this.innerArray.indexOf.apply(this.innerArray,arguments)
    }

    join(separator?: string): string {
        return this.innerArray.join.apply(this.innerArray,arguments)
    }

    keys(): IterableIterator<number> {
        return this.innerArray.keys.apply(this.innerArray,arguments)
    }

    lastIndexOf(searchElement: T, fromIndex?: number): number {
        return this.innerArray.lastIndexOf.apply(this.innerArray,arguments)
    }

    // @ts-ignore
    map<U>(callbackfn: <T>(value: T, index: number, array: T[]) => U, thisArg?: any): U[] {
        return this.innerArray.map.apply(this.innerArray,arguments);
    }

    // @ts-ignore
    reduce(callbackfn: <T>(previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T;
    // @ts-ignore
    reduce(callbackfn: <T>(previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T;
    // @ts-ignore
    reduce<U>(callbackfn: <T>(previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
    // @ts-ignore
    reduce(callbackfn, initialValue?): any {
        this.innerArray.reduce.apply(this.innerArray,arguments);
    }

    //@ts-ignore
    reduceRight(callbackfn: <T>(previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T;
    //@ts-ignore
    reduceRight(callbackfn: <T>(previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T;
    //@ts-ignore
    reduceRight<U>(callbackfn: <T>(previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
    //@ts-ignore
    reduceRight(callbackfn, initialValue?): any {
        this.innerArray.reduceRight.apply(this.innerArray,arguments);
    }

    reverse(): T[] {
        return this.innerArray.reverse.apply(this.innerArray,arguments);
    }

    shift(): T | undefined {
        return this.innerArray.shift.apply(this.innerArray,arguments)
    }

    slice(start?: number, end?: number): T[] {
        return this.innerArray.slice.apply(this.innerArray,arguments);
    }
    //@ts-ignore
    some(callbackfn: <T>(value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean {
        return this.innerArray.some.apply(this.innerArray,arguments)
    }
    //@ts-ignore
    sort(compareFn?: <T>(a: T, b: T) => number): this {
        return this.innerArray.sort.apply(this.innerArray,arguments)
    }

    splice(start: number, deleteCount?: number): T[];
    splice(start: number, deleteCount: number, ...items: T[]): T[];
    splice(start: number, deleteCount?: number, ...items: T[]): T[] {
        return this.innerArray.splice.apply(this.innerArray,arguments);
    }

    unshift(...items: T[]): number {
        return this.innerArray.unshift.apply(this.innerArray,arguments)
    }

    values(): IterableIterator<T> {
        return this.innerArray.values.apply(this.innerArray,arguments)
    }

    toJSON(): object {
        return this.innerArray;
    }
}

Object.defineProperty(ArrayImposer.prototype, 'length', {
    get(): any {
        return this.innerArray.length;
    },
    set(v: number): any {
        this.innerArray.length = v;
    }
});