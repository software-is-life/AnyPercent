import {Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import Users from "../routes/users";
import {User} from "./Users";
import {Achievements} from "./Achievements";

@Entity()
export class UserAchievements {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Users, (users) => users.userAchievements)
    user: User

    // @OneToOne(() => Achievements, (achievements) => achievements)

}