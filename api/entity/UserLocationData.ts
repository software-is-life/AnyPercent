import {Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./Users";

@Entity()
export class UserLocationData {
    @PrimaryGeneratedColumn("increment", { type: "bigint"})
    id: number

    @Column()
    uid: string

    @CreateDateColumn({ name: 'created_at'})
    createdAt: Date

    @Column("point")
    location: string

    @Index()
    @Column({type: 'bigint'})
    cityRegionId: string

    @ManyToOne(() => User, (user: User) => user.userLocationDataPoints, {
        createForeignKeyConstraints: false,
    })
    user: User
}