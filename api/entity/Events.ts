import {Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {CityMap} from "./CityMap";
import {Routes} from "./Routes";

@Entity()
export class Events {
    @PrimaryGeneratedColumn()
    eventId: number

    @Column({type: 'bigint'})
    cityRegionId: string

    @ManyToOne(() => CityMap, (cityMap) => cityMap.events)
    city: CityMap

    @ManyToMany(() => Routes, (routes) => routes.events)
    routes: Routes[]

    // Add Reviews relation
}