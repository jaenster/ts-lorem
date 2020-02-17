import { Repository } from "../Managers/Repository";
export interface DBDrivable {
    flush(repo: Repository<any>): Promise<void>;
    find<T>(repo: Repository<any>, id: any): Promise<Partial<T>>;
}
