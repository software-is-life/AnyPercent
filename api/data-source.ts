import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/Users";
import {UserLocationData} from "./entity/UserLocationData";
import {UserAchievements} from "./entity/UserAchievements";
import {Achievements} from "./entity/Achievements";
import {Routes} from "./entity/Routes";
import {Reviews} from "./entity/Reviews";
import {Places} from "./entity/Places";
import {CityMap} from "./entity/CityMap";
import {Events} from "./entity/Events";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    logging: true,
    entities: ["entity/*.ts"],
    migrations: [],
    subscribers: [],
});