import {Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import Users from "../routes/users";
import {User} from "./Users";

@Entity()
export class UserLocationData {
    @PrimaryGeneratedColumn("increment", { type: "bigint"})
    id: number

    @Index()
    @Column()
    timestamp: Date

    @Column("point")
    location: string

    @ManyToOne(() => Users, (users) => users.userLocationDataPoints)
    user: User
}