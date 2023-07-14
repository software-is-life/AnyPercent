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
    hoursOfOperation: string

    @Column({ nullable: true })
    website: string

    @Column({ nullable: true })
    rating: number

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @OneToMany(() => Reviews, (reviews) => reviews.place, {
        createForeignKeyConstraints: false,
    })
    reviews: Reviews[]

    @ManyToOne(() => CityMap, (cityMap) => cityMap.places, {
        createForeignKeyConstraints: false,
    })
    city: CityMap

    @ManyToOne(() => User, (user) => user.placesAuthored, {
        createForeignKeyConstraints: false,
    })
    author: User

    @ManyToMany(() => Tags, (tags) => tags.tag, {
        createForeignKeyConstraints: false,
    })
    @JoinTable()
    tags: Tags[]

    @ManyToMany(() => Routes, (routes) => routes.places, {
        createForeignKeyConstraints: false,
    })
    routes: Routes[]
}