"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Table {
    constructor(init) {
        this.connections = [];
        this.columns = [];
        Object.assign(this, init);
        Table.instances.push(this);
    }
    referencedOn(connection) {
        this.connections.push(connection);
    }
}
exports.Table = Table;
Table.instances = [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvTW9kZWwvVGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFPQSxNQUFhLEtBQUs7SUFNZCxZQUFZLElBQXFCO1FBSjFCLGdCQUFXLEdBQWlCLEVBQUUsQ0FBQztRQUMvQixZQUFPLEdBQWEsRUFBRSxDQUFDO1FBSTFCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRTFCLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxZQUFZLENBQUMsVUFBc0I7UUFDL0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDdEMsQ0FBQzs7QUFkTCxzQkFlQztBQVhVLGVBQVMsR0FBRyxFQUFFLENBQUMifQ==