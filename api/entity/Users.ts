import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { Geometry } from 'geojson';

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

    @Column()
    email: string

    @Column({type: 'bigint'})
    homeCityId: string;

    @Column()
    location: Geometry


    // TODO add one to many and many to many relationships between UserLocationHistory
    // TODO UserAchievements and Maps
}