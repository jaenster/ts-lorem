import Entity from "../../src/Annotation/Entity";
import Column from "../../src/Annotation/Column";
import Author from "./Author";
import EntityManager from "../../src/Managers/EntityManager";

@Entity()
export default class Post {
    @Column({id: true})
    public id: Number;

    @Column()
    public author: Author;

    @Column()
    public readonly content: String;
}
