import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Routes} from "./Routes";
import {Places} from "./Places";
import {Events} from "./Events";

@Entity()
export class CityMap {
    @PrimaryGeneratedColumn("uuid")
    cityMapId: string

    @Column()
    name: string

    @Column()
    province: string

    @Column()
    country: string

    @Column({type: 'bigint'})
    regions: string[]

    @OneToMany(() => Routes, (routes) => routes.city)
    routes: Routes[]

    @OneToMany(() => Events, (events) => events.city)
    events: Events[]

    @OneToMany(() => Places, (places) => places.city)
    places: Places[]

}