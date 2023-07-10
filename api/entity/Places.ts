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
import {Routes} from "./Routes";
import {CityMap} from "./CityMap";
import {Reviews} from "./Reviews";
import {User} from "./Users";
import {Tags} from "./Tags";

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

    @Column()
    description: string

    @Index()
    @Column({type: 'bigint'})
    cityRegionId: string

    @Column()
    address: string

    @Column({ nullable: true })
    phone: string

    @Column({ nullable: true })
    hoursOfOperation: string[]

    @Column({ nullable: true })
    website: string

    @Column({ nullable: true })
    rating: number

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(() => CityMap, (cityMap) => cityMap.places)
    city: CityMap

    @ManyToOne(() => User, (user) => user.placesAuthored)
    author: User

    @ManyToMany(() => Tags, (tags) => tags.tag)
    @JoinTable()
    tags: Tags[]

    @ManyToMany(() => Routes, (routes) => routes.places)
    routes: Routes[]

    @OneToMany(() => Reviews, (reviews) => reviews.place)
    reviews: Reviews[]
}