import {
    Column,
    CreateDateColumn,
    Entity, Generated,
    Index,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
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
    uid: string

    @Index()
    @Column({
        type: "enum",
        enum: AchievementStatus,
        default: AchievementStatus.INPROGRESS,
    })
    status: AchievementStatus

    @Column("multipoint")
    placesVisited: string

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(() => User, (user: User) => user.userAchievements, {
        createForeignKeyConstraints: false,
    })
    user: User

    @ManyToOne(() => Achievements, (achievements) => achievements.userAchievements, {
        createForeignKeyConstraints: false,
    })
    achievement: Achievements
}