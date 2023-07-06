import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Geometry} from "geojson";
import Users from "../routes/users";
import {User} from "./Users";

@Entity()
export class UserLocationData {
    @PrimaryGeneratedColumn("uuid")
    userLocationDataId: string

    @Column()
    timestamp: Date

    @Column("point")
    location: string

    @ManyToOne(() => Users, (users) => users.userLocationDataPoints)
    user: User
}