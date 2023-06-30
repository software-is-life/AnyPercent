import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm"
import { Geometry } from 'geojson';
import {UserLocationData} from "./UserLocationData";
import {UserAchievements} from "./UserAchievements";
import {Routes} from "./Routes";
import {Reviews} from "./Reviews";

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    userId: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    @Column()
    email: string

    @Column({type: 'bigint'})
    homeCityId: string;

    @Column()
    location: Geometry

    @OneToMany(() => UserLocationData, (userLocationData) => userLocationData.user)
    userLocationDataPoints: UserLocationData[]

    @OneToMany(() => UserAchievements, (userAchievements) => userAchievements.user)
    userAchievements: UserAchievements[]

    @OneToMany(() => Routes, (routes) => routes.author)
    routesAuthored: Routes[]

    @OneToMany(() => Reviews, (reviews) => reviews.author)
    reviewsAuthored: Reviews[]
}