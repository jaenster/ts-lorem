import {Repository} from "../Managers/Repository";

export interface DBDrivable {
    flush(repo: Repository<any>): Promise<void>;
}