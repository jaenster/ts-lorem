"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Column_1 = require("../Model/Column");
exports.ColumnsSymbol = Symbol('Columns');
const defaultSettings = {};
function Column(settings = {}) {
    const config = Object.assign({}, defaultSettings, settings);
    return (target, propertyKey) => {
        config.name = propertyKey;
        config.type = Reflect.getMetadata('design:type', target, propertyKey);
        const constructor = target.constructor;
        if (!constructor[exports.ColumnsSymbol])
            constructor[exports.ColumnsSymbol] = [];
        constructor[exports.ColumnsSymbol].push(new Column_1.Column({ ...config, model: target }));
    };
}
exports.Column = Column;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29sdW1uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0Fubm90YXRpb24vQ29sdW1uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsNEJBQTBCO0FBRzFCLDRDQUFzRDtBQVd6QyxRQUFBLGFBQWEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDL0MsTUFBTSxlQUFlLEdBQW1CLEVBQUUsQ0FBQztBQUUzQyxTQUFnQixNQUFNLENBQUUsV0FBMkIsRUFBRTtJQUNqRCxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxlQUFlLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDNUQsT0FBTyxDQUFDLE1BQVcsRUFBRSxXQUFtQixFQUFFLEVBQUU7UUFDeEMsTUFBTSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUM7UUFDMUIsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFdEUsTUFBTSxXQUFXLEdBQWUsTUFBTSxDQUFDLFdBQTZELENBQUM7UUFFckcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxxQkFBYSxDQUFDO1lBQUUsV0FBVyxDQUFDLHFCQUFhLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFakUsV0FBVyxDQUFDLHFCQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxlQUFXLENBQUMsRUFBQyxHQUFHLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pGLENBQUMsQ0FBQTtBQUNMLENBQUM7QUFaRCx3QkFZQyJ9