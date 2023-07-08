import {Column, Entity, Generated, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
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

    @Index()
    @Column('character varying', {
        length: 25,
        unique: true
    })
    tag: string;

    @ManyToMany(() => Achievements, (achievements: Achievements) => achievements.tags)
    @JoinTable()
    achievements: Achievements

    @ManyToMany(() => Events, (events: Events) => events.tags)
    @JoinTable()
    events: Events

    @ManyToMany(() => Places, (places: Places) => places.tags)
    @JoinTable()
    places: Places

    @ManyToMany(() => Routes, (routes: Routes) => routes.tags)
    @JoinTable()
    routes: Routes

    @ManyToMany(() => Reviews, (reviews: Reviews) => reviews.tags)
    @JoinTable()
    reviews: Reviews
}