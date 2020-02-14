import Entity from "../../src/Annotation/Entity";
import Column from "../../src/Annotation/Column";

@Entity()
export default class Author {

    @Column({id: true})
    private id: Number;

    @Column()
    private name;
}
