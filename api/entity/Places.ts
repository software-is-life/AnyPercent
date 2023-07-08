import {Column, Entity, Generated, Index, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Routes} from "./Routes";
import {CityMap} from "./CityMap";
import {Reviews} from "./Reviews";
import {User} from "./Users";

@Entity()
export class Places {
    @PrimaryGeneratedColumn("increment", { type: "bigint"})
    id: number

    @Column()
    @Generated("uuid")
    placeId: string

    @Index()
    @Column()
    name: string

    @Index()
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

    @ManyToOne(() => User, (user) => user.placesAuthored)
    author: User

    @ManyToMany(() => Routes, (routes) => routes.places)
    routes: Routes[]

    @OneToMany(() => Reviews, (reviews) => reviews.place)
    reviews: Reviews[]
}