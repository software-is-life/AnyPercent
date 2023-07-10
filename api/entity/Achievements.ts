import {
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    Index,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";
import {UserAchievements} from "./UserAchievements";
import {Routes} from "./Routes";
import {Tags} from "./Tags";

@Entity()
export class Achievements {
    @PrimaryGeneratedColumn("increment", { type: "bigint"})
    id: number

    @Column()
    @Generated("uuid")
    achievementId: string

    @Index()
    @Column()
    name: string

    @Column()
    description: string

    @Index()
    @Column({ nullable: true })
    author: string

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToMany(() => Tags, (tags) => tags.tag)
    @JoinTable()
    tags: Tags[]

    @OneToMany(() => UserAchievements, (userAchievements) => userAchievements.achievement)
    userAchievements: UserAchievements[]

    @ManyToMany(() => Routes, (routes) => routes.achievements)
    @JoinTable()
    routes: Routes[]
}