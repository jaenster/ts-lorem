import { Repository } from "../Managers/Repository";
export interface DBDrivable {
    findByColumn<T>(repo: Repository<T>, arg1: Partial<T>): Promise<T[]>;
    flush(repo: Repository<any>): Promise<void>;
    find<T>(repo: Repository<any>, id: any): Promise<Partial<T>>;
}
