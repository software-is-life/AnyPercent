import {
    Column,
    CreateDateColumn,
    Entity, Generated,
    Index,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import Users from "../routers/users";
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

    @Column()
    @Generated("uuid")
    userAchievementId: string

    @Column()
    userId: string

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

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}