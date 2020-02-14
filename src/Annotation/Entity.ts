import EntityManager from "../Managers/EntityManager";

export function Entity(settings = {}) {
    /**
     * @param constructor
     * @constructor
     */
    return function <T extends { new(...args: any[]): {} }>(constructor: T) {
        EntityManager.register(constructor)
    }
}