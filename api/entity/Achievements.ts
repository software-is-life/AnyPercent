import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Achievements {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    author: string

    @Column()
    tags: string[]

    // badges
}