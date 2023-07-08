import {Column, Entity, Generated, Index, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./Users";
import {Places} from "./Places";
import {Events} from "./Events";
import {Routes} from "./Routes";
import {Tags} from "./Tags";

@Entity()
export class Reviews {
    @PrimaryGeneratedColumn("increment", { type: "bigint"})
    id: number

    @Column()
    @Generated("uuid")
    reviewId: string

    @Index()
    @Column()
    title: string

    @Column()
    description: string

    @Column()
    rating: number

    @Index()
    @Column()
    reviewType: string

    @ManyToOne(() => User, (user) => user.reviewsAuthored)
    author: User

    @ManyToOne(() => Events, (events) => events.reviews)
    event: Events

    @ManyToOne(() => Places, (places) => places.reviews)
    place: Places

    @ManyToOne(() => Routes, (routes) => routes.reviews)
    route: Routes

    @ManyToMany(() => Tags, (tags) => tags.tag)
    @JoinTable()
    tags: Tags[]
}