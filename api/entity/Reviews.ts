import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./Users";

@Entity()
export class Reviews {
    @PrimaryGeneratedColumn()
    reviewId: number

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    rating: number

    @Column()
    reviewType: string

    @ManyToOne(() => User, (user) => user.reviewsAuthored)
    author: User
}