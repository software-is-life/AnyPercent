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

    @OneToMany(() => UserAchievements, (userAchievements) => userAchievements.achievement)
    userAchievements: UserAchievements[]

    @ManyToMany(() => Tags, (tags) => tags.tag, {
        createForeignKeyConstraints: false,
    })
    @JoinTable()
    tags: Tags[]

    @ManyToMany(() => Routes, (routes) => routes.achievements, {
        createForeignKeyConstraints: false,
    })
    routes: Routes[]
}