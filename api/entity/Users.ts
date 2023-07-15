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
import {UserAchievements} from "./UserAchievements";
import {Routes} from "./Routes";
import {Reviews} from "./Reviews";
import {Events} from "./Events";
import {Places} from "./Places";

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
    @Column()
    homeCityId: string;

    @Column()
    locationCoordinates: string;

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

    @OneToMany(() => UserLocationData, (userLocationData) => userLocationData.user, {
        createForeignKeyConstraints: false,
    })
    userLocationDataPoints: UserLocationData[]

    @OneToMany(() => UserAchievements, (userAchievements) => userAchievements.user, {
        createForeignKeyConstraints: false,
    })
    userAchievements: UserAchievements[]

    @OneToMany(() => Routes, (routes: Routes) => routes.author, {
        createForeignKeyConstraints: false,
    })
    routesAuthored: Routes[]

    @OneToMany(() => Events, (events: Events) => events.author, {
        createForeignKeyConstraints: false,
    })
    eventsAuthored: Events[]

    @OneToMany(() => Places, (places: Places) => places.author, {
        createForeignKeyConstraints: false,
    })
    placesAuthored: Places[]

    @OneToMany(() => Reviews, (reviews) => reviews.author, {
        createForeignKeyConstraints: false,
    })
    reviewsAuthored: Reviews[]
}