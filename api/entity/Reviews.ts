import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./Users";
import {Places} from "./Places";
import {Events} from "./Events";
import {Routes} from "./Routes";

@Entity()
export class Reviews {
    @PrimaryGeneratedColumn("uuid")
    reviewId: string

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    rating: number

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
}