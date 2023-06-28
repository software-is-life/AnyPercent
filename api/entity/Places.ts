import {Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Routes} from "./Routes";
import {CityMap} from "./CityMap";

@Entity()
export class Places {
    @PrimaryGeneratedColumn()
    placesId: number

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

    // Add Reviews relation
}