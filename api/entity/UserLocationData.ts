import {Column, CreateDateColumn, Entity, Generated, Index, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import Users from "../routers/users";
import {User} from "./Users";

@Entity()
export class UserLocationData {
    @PrimaryGeneratedColumn("increment", { type: "bigint"})
    id: number

    @Column()
    userId: string

    @Index()
    @CreateDateColumn({ name: 'created_at'})
    createdAt: Date

    @Column("point")
    location: string

    @Index()
    @Column({type: 'bigint'})
    cityRegionId: string

    @ManyToOne(() => Users, (users) => users.userLocationDataPoints)
    user: User
}