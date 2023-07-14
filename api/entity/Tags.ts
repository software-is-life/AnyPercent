import {
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    Index,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";
import {Achievements} from "./Achievements";
import {Events} from "./Events";
import {Places} from "./Places";
import {Routes} from "./Routes";
import {Reviews} from "./Reviews";

@Entity()
export class Tags {
    @PrimaryGeneratedColumn("increment", { type: "bigint"})
    id: number

    @Column()
    @Generated("uuid")
    tagId: string

    @Column('varchar', {
        length: 25,
        unique: true
    })
    tag: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @ManyToMany(() => Achievements, (achievements: Achievements) => achievements.tags, {
        createForeignKeyConstraints: false,
    })
    achievements: Achievements

    @ManyToMany(() => Events, (events: Events) => events.tags, {
        createForeignKeyConstraints: false,
    })
    events: Events

    @ManyToMany(() => Places, (places: Places) => places.tags, {
        createForeignKeyConstraints: false,
    })
    places: Places

    @ManyToMany(() => Routes, (routes: Routes) => routes.tags, {
        createForeignKeyConstraints: false,
    })
    routes: Routes

    @ManyToMany(() => Reviews, (reviews: Reviews) => reviews.tags, {
        createForeignKeyConstraints: false,
    })
    reviews: Reviews
}