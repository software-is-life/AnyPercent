import {
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    Index,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";
import {User} from "./Users";
import {Places} from "./Places";
import {Events} from "./Events";
import {Routes} from "./Routes";
import {Tags} from "./Tags";

@Entity()
export class Reviews {
    @PrimaryGeneratedColumn("increment", { type: "bigint"})
    id: number

    @Column()
    @Generated("uuid")
    reviewId: string

    @Index()
    @Column()
    title: string

    @Column()
    description: string

    @Column()
    rating: number

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.reviewsAuthored, {
        createForeignKeyConstraints: false,
    })
    author: User

    @ManyToOne(() => Events, (events) => events.reviews, {
        createForeignKeyConstraints: false,
    })
    event: Events

    @ManyToOne(() => Places, (places) => places.reviews, {
        createForeignKeyConstraints: false,
    })
    place: Places

    @ManyToOne(() => Routes, (routes) => routes.reviews, {
        createForeignKeyConstraints: false,
    })
    route: Routes

    @ManyToMany(() => Tags, (tags) => tags.tag, {
        createForeignKeyConstraints: false,
    })
    @JoinTable()
    tags: Tags[]
}