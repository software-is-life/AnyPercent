import "reflect-metadata";
import { DataSource } from "typeorm";
import * as process from "process";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.PLANET_SCALE_HOST,
    port: 3306,
    username: process.env.PLANET_SCALE_USERNAME,
    password: process.env.PLANET_SCALE_PASSWORD,
    database: process.env.PLANET_SCALE_DATABASE,
    synchronize: true,
    logging: true,
    entities: ["entity/*.ts"],
    migrations: [],
    subscribers: [],
});