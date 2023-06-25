import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

// TODO: fill out more entities from DB design
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number
}