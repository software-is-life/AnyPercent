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
import {CityMap} from "./CityMap";
import {Routes} from "./Routes";
import {Reviews} from "./Reviews";
import {User} from "./Users";
import {Tags} from "./Tags";

@Entity()
export class Events {
    @PrimaryGeneratedColumn("increment", { type: "bigint"})
    id: number

    @Column()
    @Generated("uuid")
    eventId: string

    @Index()
    @Column()
    name: string

    @Column()
    description: string

    @Index()
    @Column()
    cityRegionId: string

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @OneToMany(() => Reviews, (reviews) => reviews.event, {
        createForeignKeyConstraints: false,
    })
    reviews: Reviews[]

    @ManyToOne(() => User, (user) => user.eventsAuthored, {
        createForeignKeyConstraints: false,
    })
    author: User

    @ManyToOne(() => CityMap, (cityMap) => cityMap.events, {
        createForeignKeyConstraints: false,
    })
    city: CityMap

    @ManyToMany(() => Tags, (tags) => tags.tag, {
        createForeignKeyConstraints: false,
    })
    @JoinTable()
    tags: Tags[]

    @ManyToMany(() => Routes, (routes) => routes.events, {
        createForeignKeyConstraints: false,
    })
    routes: Routes[]
}