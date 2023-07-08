import {Column, Entity, Index, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import Users from "../routes/users";
import {User} from "./Users";
import {Achievements} from "./Achievements";

@Entity()
export class UserAchievements {
    @PrimaryGeneratedColumn("increment", { type: "bigint"})
    id: number

    @ManyToOne(() => Users, (users) => users.userAchievements)
    user: User

    @ManyToOne(() => Achievements, (achievements) => achievements)
    achievement: Achievements

    @Index()
    @Column()
    status: string

    @Column("point", { array: true })
    placesVisited: string[]
}