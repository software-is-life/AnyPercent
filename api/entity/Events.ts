import {Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {CityMap} from "./CityMap";
import {Routes} from "./Routes";
import {Reviews} from "./Reviews";

@Entity()
export class Events {
    @PrimaryGeneratedColumn("uuid")
    eventId: string

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    owner: string

    @Column({type: 'bigint'})
    cityRegionId: string

    @ManyToOne(() => CityMap, (cityMap) => cityMap.events)
    city: CityMap

    @ManyToMany(() => Routes, (routes) => routes.events)
    routes: Routes[]

    @OneToMany(() => Reviews, (reviews) => reviews.event)
    reviews: Reviews[]
}