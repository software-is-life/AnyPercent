import {Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import Users from "../routes/users";
import {User} from "./Users";
import {Achievements} from "./Achievements";
import {Geometry} from "geojson";

@Entity()
export class UserAchievements {
    @PrimaryGeneratedColumn()
    userAchievementId: number

    @ManyToOne(() => Users, (users) => users.userAchievements)
    user: User

    @ManyToOne(() => Achievements, (achievements) => achievements)
    achievement: Achievements

    @Column()
    status: string

    @Column()
    placesVisited: Geometry[]
}