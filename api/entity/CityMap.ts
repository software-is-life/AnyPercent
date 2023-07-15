import {
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Routes} from "./Routes";
import {Places} from "./Places";
import {Events} from "./Events";

@Entity()
export class CityMap {
    @PrimaryGeneratedColumn("increment", { type: "bigint"})
    id: number

    @Column()
    @Generated("uuid")
    cityMapId: string

    @Column()
    name: string

    @Column({ nullable: true })
    province: string

    @Column()
    country: string

    @Column()
    regions: string

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @OneToMany(() => Routes, (routes) => routes.city, {
        createForeignKeyConstraints: false,
    })
    routes: Routes[]

    @OneToMany(() => Events, (events) => events.city, {
        createForeignKeyConstraints: false,
    })
    events: Events[]

    @OneToMany(() => Places, (places) => places.city, {
        createForeignKeyConstraints: false,
    })
    places: Places[]
}