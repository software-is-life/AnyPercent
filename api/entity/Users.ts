import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    Generated,
    UpdateDateColumn,
    CreateDateColumn,
    Index
} from "typeorm";
import {UserLocationData} from "./UserLocationData";
import {AchievementStatus, UserAchievements} from "./UserAchievements";
import {Routes} from "./Routes";
import {Reviews} from "./Reviews";

export enum Role {
    ADMIN = "admin",
    OWNER = "owner",
    USER = "user"
}

@Entity()
export class User {
    @PrimaryGeneratedColumn("increment", { type: "bigint"})
    id: number

    @Column()
    @Generated("uuid")
    userId: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({ nullable: true })
    age: number

    @Column({ unique: true })
    email: string

    @Index()
    @Column({type: 'bigint'})
    homeCityId: string;

    @Column("point")
    locationCoordinates: string

    // TODO: look up how Waze does there user point system
    // research: https://www.waze.com//wiki/Canada/Your_Rank_and_Points
    @Column()
    points: number

    @Index()
    @Column({
        type: "enum",
        enum: Role,
        default: Role.USER,
    })
    userRole: Role

    @CreateDateColumn({ name: 'created_at'})
    createdAt: Date

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date

    @OneToMany(() => UserLocationData, (userLocationData) => userLocationData.user)
    userLocationDataPoints: UserLocationData[]

    @OneToMany(() => UserAchievements, (userAchievements) => userAchievements.user)
    userAchievements: UserAchievements[]

    @OneToMany(() => Routes, (routes) => routes.author)
    routesAuthored: Routes[]

    @OneToMany(() => Routes, (routes) => routes.author)
    eventsAuthored: Routes[]

    @OneToMany(() => Routes, (routes) => routes.author)
    placesAuthored: Routes[]

    @OneToMany(() => Reviews, (reviews) => reviews.author)
    reviewsAuthored: Reviews[]
}