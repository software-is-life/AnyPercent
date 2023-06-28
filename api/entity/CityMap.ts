import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Routes} from "./Routes";
import {Places} from "./Places";
import {Events} from "./Events";

@Entity()
export class CityMap {
    @PrimaryGeneratedColumn()
    CityMap: number

    @Column({type: 'bigint'})
    regions: string[]

    @OneToMany(() => Routes, (routes) => routes.city)
    routes: Routes[]

    @OneToMany(() => Events, (events) => events.city)
    events: Events[]

    @OneToMany(() => Places, (places) => places.city)
    places: Places[]

}