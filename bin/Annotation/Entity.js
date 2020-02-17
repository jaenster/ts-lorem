"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const Repository_1 = require("../Managers/Repository");
const defasultSettings = {
    repository: Repository_1.Repository,
    tabel: null,
};
function Entity(settings = {}) {
    const config = Object.assign({}, defasultSettings, settings);
    return function (constructor) {
        if (!config.tabel) {
            config.tabel = constructor.name.replace(/(?<!^)[A-Z]/g, key => '_' + key.toLowerCase()).toLowerCase();
        }
        __1.EntityManager.register(constructor, config);
    };
}
exports.Entity = Entity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW50aXR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0Fubm90YXRpb24vRW50aXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMEJBQTZDO0FBRTdDLHVEQUFrRDtBQVFsRCxNQUFNLGdCQUFnQixHQUFrQjtJQUNwQyxVQUFVLEVBQUUsdUJBQVU7SUFDdEIsS0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDO0FBRUYsU0FBZ0IsTUFBTSxDQUFDLFdBQTBCLEVBQUU7SUFDL0MsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFLN0QsT0FBTyxVQUFpRCxXQUFjO1FBQ2xFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO1lBQ2YsTUFBTSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDekc7UUFDRCxpQkFBYSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDL0MsQ0FBQyxDQUFBO0FBQ0wsQ0FBQztBQVpELHdCQVlDIn0=