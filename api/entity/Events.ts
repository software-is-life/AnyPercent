import {
    Column,
    Entity,
    Generated,
    Index,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import {CityMap} from "./CityMap";
import {Routes} from "./Routes";
import {Reviews} from "./Reviews";
import {User} from "./Users";
import {Tags} from "./Tags";

@Entity()
export class Events {
    @PrimaryGeneratedColumn("increment", { type: "bigint"})
    id: number

    @Column()
    @Generated("uuid")
    eventId: string

    @Index()
    @Column()
    name: string

    @Column()
    description: string

    @Index()
    @Column({type: 'bigint'})
    cityRegionId: string

    @ManyToOne(() => User, (user) => user.eventsAuthored)
    author: User

    @ManyToOne(() => CityMap, (cityMap) => cityMap.events)
    city: CityMap

    @ManyToMany(() => Tags, (tags) => tags.tag)
    @JoinTable()
    tags: Tags[]

    @ManyToMany(() => Routes, (routes) => routes.events)
    routes: Routes[]

    @OneToMany(() => Reviews, (reviews) => reviews.event)
    reviews: Reviews[]
}