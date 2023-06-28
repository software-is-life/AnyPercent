import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Geometry} from "geojson";
import Users from "../routes/users";
import {User} from "./Users";

@Entity()
export class UserLocationData {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    timestamp: Date

    @Column()
    location: Geometry

    @ManyToOne(() => Users, (users) => users.userLocationDataPoints)
    user: User
}