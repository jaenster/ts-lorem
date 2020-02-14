"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EntityManager_1 = require("../Managers/EntityManager");
class Column {
    constructor(init) {
        Object.assign(this, init);
        const type = this.type;
        if (typeof type === 'function' && type.hasOwnProperty(EntityManager_1.EntityFieldSymbol)) {
            const repo = type[EntityManager_1.EntityFieldSymbol];
            repo.table.referencedOn({ model: this.model, column: this, });
        }
    }
}
exports.Column = Column;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29sdW1uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL01vZGVsL0NvbHVtbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLDZEQUE0RDtBQUk1RCxNQUFhLE1BQU07SUFNZixZQUFZLElBQXFCO1FBQzdCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzFCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFJdkIsSUFBSSxPQUFPLElBQUksS0FBSyxVQUFVLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQ0FBaUIsQ0FBQyxFQUFFO1lBQ3RFLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxpQ0FBaUIsQ0FBQyxDQUFDO1lBQ3BDLElBQWdDLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEdBQUUsQ0FBQyxDQUFBO1NBRTNGO0lBQ0wsQ0FBQztDQUNKO0FBbEJELHdCQWtCQyJ9