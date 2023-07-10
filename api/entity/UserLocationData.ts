import {Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import Users from "../routers/users";
import {User} from "./Users";

@Entity()
export class UserLocationData {
    @PrimaryGeneratedColumn("increment", { type: "bigint"})
    id: number

    @Index()
    @CreateDateColumn({ name: 'created_at'})
    createdAt: Date

    @Column("point")
    location: string

    @ManyToOne(() => Users, (users) => users.userLocationDataPoints)
    user: User
}