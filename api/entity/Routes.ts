import {
    Column, CreateDateColumn,
    Entity,
    Generated,
    Index,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";
import {Achievements} from "./Achievements";
import {User} from "./Users";
import {CityMap} from "./CityMap";
import {Places} from "./Places";
import {Events} from './Events';
import {Reviews} from "./Reviews";
import {Tags} from "./Tags";

@Entity()
export class Routes {
    @PrimaryGeneratedColumn("increment", { type: "bigint"})
    id: number

    @Column()
    @Generated("uuid")
    routeId: string

    @Index()
    @Column({
        type: 'bigint',
        array: true
    })
    cityRegionId: string[]

    @Index()
    @Column()
    name: string

    @Column()
    description: string

    @ManyToOne(() => User, (user) => user.routesAuthored)
    author: User

    @OneToMany(() => Reviews, (reviews) => reviews.route)
    reviews: Reviews[]

    @ManyToOne(() => CityMap, (cityMap) => cityMap.regions)
    city: CityMap

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToMany(() => Achievements, (achievements) => achievements.routes)
    achievements: Achievements[]

    @ManyToMany(() => Events, (events) => events.routes)
    events: Events[]

    @ManyToMany(() => Places, (places) => places.routes)
    places: Places[]

    @ManyToMany(() => Tags, (tags) => tags.tag)
    @JoinTable()
    tags: Tags[]
}