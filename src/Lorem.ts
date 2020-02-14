import EntityManager from "./Managers/EntityManager";
import Collection from "./Model/Collection";


export default class Lorem {
    static async generatedSQL(modelDirectory: string) {
        const fs = require('fs');
        let all = [];
        const readDir = (path: string = '') => fs.readdir(modelDirectory + path, async (err, files) => {

        });


        readDir();
    }
}