import "reflect-metadata";
import { DataSource } from "typeorm";
import * as process from "process";
import { join } from 'path';

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.PLANET_SCALE_HOST_LOCAL,
    port: 3306,
    username: process.env.PLANET_SCALE_USERNAME_LOCAL,
    password: process.env.PLANET_SCALE_PASSWORD_LOCAL,
    database: process.env.PLANET_SCALE_DATABASE_LOCAL,
    synchronize: true, //false,
    // ssl: {
    //     rejectUnauthorized: true,
    // },
    logging: true,
    entities: [join(__dirname, 'entity/*.{ts,js}')],
    migrations: [],
    subscribers: [],
});