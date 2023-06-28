import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UserAchievements} from "./UserAchievements";
import {Geometry} from "geojson";
import {Routes} from "./Routes";

@Entity()
export class Achievements {
    @PrimaryGeneratedColumn()
    achievementId: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    author: string

    @Column()
    tags: string[]

    @OneToMany(() => UserAchievements, (userAchievements) => userAchievements.achievement)
    userAchievements: UserAchievements[]

    @ManyToMany(() => Routes, (routes) => routes.achievements)
    @JoinTable()
    routes: Routes[]

    // badges
}