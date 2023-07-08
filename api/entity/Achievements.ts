import {Column, Entity, Generated, Index, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UserAchievements} from "./UserAchievements";
import {Routes} from "./Routes";
import {Tags} from "./Tags";

@Entity()
export class Achievements {
    @PrimaryGeneratedColumn("increment", { type: "bigint"})
    id: number

    @Column()
    @Generated("uuid")
    routeId: string

    @Index()
    @Column()
    name: string

    @Column()
    description: string

    @Index()
    @Column()
    author: string

    @ManyToMany(() => Tags, (tags) => tags.tag)
    @JoinTable()
    tags: Tags[]

    @OneToMany(() => UserAchievements, (userAchievements) => userAchievements.achievement)
    userAchievements: UserAchievements[]

    @ManyToMany(() => Routes, (routes) => routes.achievements)
    @JoinTable()
    routes: Routes[]
}