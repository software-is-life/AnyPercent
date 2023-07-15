import {Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./Users";

@Entity()
export class UserLocationData {
    @PrimaryGeneratedColumn("increment", { type: "bigint"})
    id: number

    @Column()
    uid: string

    @Column()
    location: string

    @Index()
    @Column()
    cityRegionId: string

    @CreateDateColumn({ name: 'created_at'})
    createdAt: Date

    @ManyToOne(() => User, (user: User) => user.userLocationDataPoints, {
        createForeignKeyConstraints: false,
    })
    user: User
}