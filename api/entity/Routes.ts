import {Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Achievements} from "./Achievements";
import {User} from "./Users";
import {CityMap} from "./CityMap";
import {Places} from "./Places";
import {Events} from './Events';

@Entity()
export class Routes {
    @PrimaryGeneratedColumn()
    routeId: number

    @Column({type: 'bigint'})
    cityRegionId: string

    @Column()
    name: string

    @Column()
    description: string

    @ManyToOne(() => User, (user) => user.routesAuthored)
    author: User

    @ManyToOne(() => CityMap, (cityMap) => cityMap.regions)
    city: CityMap

    @ManyToMany(() => Achievements, (achievements) => achievements.routes)
    achievements: Achievements[]

    @ManyToMany(() => Events, (events) => events.routes)
    events: Events[]

    @ManyToMany(() => Places, (places) => places.routes)
    places: Places[]

    // TODO: Add Reviews relation
}