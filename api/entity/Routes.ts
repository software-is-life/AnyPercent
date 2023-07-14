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

    @Column({
        type: 'bigint'
    })
    cityRegionId: string

    @Index()
    @Column()
    name: string

    @Column()
    description: string

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @OneToMany(() => Reviews, (reviews) => reviews.route, {
        createForeignKeyConstraints: false,
    })
    reviews: Reviews[]

    @ManyToOne(() => User, (user) => user.routesAuthored, {
        createForeignKeyConstraints: false,
    })
    author: User

    @ManyToOne(() => CityMap, (cityMap) => cityMap.routes, {
        createForeignKeyConstraints: false,
    })
    city: CityMap

    @ManyToMany(() => Achievements, (achievements: Achievements) => achievements.routes, {
        createForeignKeyConstraints: false,
    })
    @JoinTable()
    achievements: Achievements[]

    @ManyToMany(() => Events, (events: Events) => events.routes, {
        createForeignKeyConstraints: false,
    })
    @JoinTable()
    events: Events[]

    @ManyToMany(() => Places, (places: Places) => places.routes, {
        createForeignKeyConstraints: false,
    })
    @JoinTable()
    places: Places[]

    @ManyToMany(() => Tags, (tags: Tags) => tags.tag, {
        createForeignKeyConstraints: false,
    })
    @JoinTable()
    tags: Tags[]
}