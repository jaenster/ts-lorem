"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArrayImposer {
    constructor() {
        this.innerArray = [];
    }
    push(...args) {
        return this.innerArray.push.apply(this.innerArray, args);
    }
    pop(...args) {
        return this.innerArray.pop.apply(this.innerArray, args);
    }
    [Symbol.iterator]() {
        return undefined;
    }
    [Symbol.unscopables]() {
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
    concat(...items) {
        return this.innerArray.concat.apply(this.innerArray);
    }
    copyWithin(target, start, end) {
        return this.innerArray.copyWithin.apply(this.innerArray, arguments);
    }
    entries() {
        return this.innerArray.entries.apply(this.innerArray, arguments);
    }
    every(callbackfn, thisArg) {
        return this.innerArray.every.apply(this.innerArray, arguments);
    }
    fill(value, start, end) {
        return this.innerArray.fill.apply(this.innerArray, arguments);
    }
    filter(callbackfn, thisArg) {
    }
    find(predicate, thisArg) {
    }
    findIndex(predicate, thisArg) {
        return this.innerArray.findIndex.apply(this.innerArray, arguments);
    }
    flat(depth) {
    }
    flatMap(callback, thisArg) {
        return this.innerArray.flatMap.apply(this.innerArray, arguments);
    }
    forEach(callbackfn, thisArg) {
    }
    includes(searchElement, fromIndex) {
        return this.innerArray.includes.apply(this.innerArray, arguments);
    }
    indexOf(searchElement, fromIndex) {
        return this.innerArray.indexOf.apply(this.innerArray, arguments);
    }
    join(separator) {
        return this.innerArray.join.apply(this.innerArray, arguments);
    }
    keys() {
        return this.innerArray.keys.apply(this.innerArray, arguments);
    }
    lastIndexOf(searchElement, fromIndex) {
        return this.innerArray.lastIndexOf.apply(this.innerArray, arguments);
    }
    map(callbackfn, thisArg) {
        return this.innerArray.map.apply(this.innerArray, arguments);
    }
    reduce(callbackfn, initialValue) {
        this.innerArray.reduce.apply(this.innerArray, arguments);
    }
    reduceRight(callbackfn, initialValue) {
        this.innerArray.reduceRight.apply(this.innerArray, arguments);
    }
    reverse() {
        return this.innerArray.reverse.apply(this.innerArray, arguments);
    }
    shift() {
        return this.innerArray.shift.apply(this.innerArray, arguments);
    }
    slice(start, end) {
        return this.innerArray.slice.apply(this.innerArray, arguments);
    }
    some(callbackfn, thisArg) {
        return this.innerArray.some.apply(this.innerArray, arguments);
    }
    sort(compareFn) {
        return this.innerArray.sort.apply(this.innerArray, arguments);
    }
    splice(start, deleteCount, ...items) {
        return this.innerArray.splice.apply(this.innerArray, arguments);
    }
    unshift(...items) {
        return this.innerArray.unshift.apply(this.innerArray, arguments);
    }
    values() {
        return this.innerArray.values.apply(this.innerArray, arguments);
    }
    toJSON() {
        return this.innerArray;
    }
}
exports.default = ArrayImposer;
Object.defineProperty(ArrayImposer.prototype, 'length', {
    get() {
        return this.innerArray.length;
    },
    set(v) {
        this.innerArray.length = v;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXJyYXlJbXBvc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL01vZGVsL0FycmF5SW1wb3Nlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQXFCLFlBQVk7SUFBakM7UUFDWSxlQUFVLEdBQVEsRUFBRSxDQUFDO0lBOEtqQyxDQUFDO0lBNUtHLElBQUksQ0FBQyxHQUFHLElBQUk7UUFDUixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxHQUFHLENBQUMsR0FBRyxJQUFJO1FBQ1AsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBS0QsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ2IsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUVELENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUNoQixPQUFPO1lBQ0gsVUFBVSxFQUFFLEtBQUs7WUFDakIsT0FBTyxFQUFFLEtBQUs7WUFDZCxJQUFJLEVBQUUsS0FBSztZQUNYLElBQUksRUFBRSxLQUFLO1lBQ1gsU0FBUyxFQUFFLEtBQUs7WUFDaEIsSUFBSSxFQUFFLEtBQUs7WUFDWCxNQUFNLEVBQUUsS0FBSztTQUNoQixDQUFDO0lBQ04sQ0FBQztJQUlELE1BQU0sQ0FBQyxHQUFHLEtBQTZCO1FBQ25DLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQsVUFBVSxDQUFDLE1BQWMsRUFBRSxLQUFhLEVBQUUsR0FBWTtRQUNsRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJ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