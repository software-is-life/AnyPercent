import {Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Routes} from "./Routes";
import {CityMap} from "./CityMap";
import {Reviews} from "./Reviews";

@Entity()
export class Places {
    @PrimaryGeneratedColumn("uuid")
    placesId: string

    @Column({type: 'bigint'})
    cityRegionId: string

    @Column()
    address: string

    @Column()
    phone: string

    @Column()
    hoursOfOperation: string[]

    @Column()
    website: string

    @Column()
    tags: string[]

    @Column()
    rating: number

    @ManyToOne(() => CityMap, (cityMap) => cityMap.places)
    city: CityMap

    @ManyToMany(() => Routes, (routes) => routes.places)
    routes: Routes[]

    @OneToMany(() => Reviews, (reviews) => reviews.place)
    reviews: Reviews[]
}