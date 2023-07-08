import {Column, Entity, Index, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import Users from "../routes/users";
import {User} from "./Users";
import {Achievements} from "./Achievements";

export enum AchievementStatus {
    INPROGRESS = "inProgress",
    BRONZE = "bronze",
    SILVER = "silver",
    GOLD = "gold"
}

@Entity()
export class UserAchievements {
    @PrimaryGeneratedColumn("increment", { type: "bigint"})
    id: number

    @ManyToOne(() => Users, (users) => users.userAchievements)
    user: User

    @ManyToOne(() => Achievements, (achievements) => achievements)
    achievement: Achievements

    @Index()
    @Column({
        type: "enum",
        enum: AchievementStatus,
        default: AchievementStatus.INPROGRESS,
    })
    status: AchievementStatus

    @Column("point", { array: true })
    placesVisited: string[]
}