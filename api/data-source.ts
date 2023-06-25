import {DataSource} from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "yada yada yada",
    password: "yada yada yada",
    database: "yada yada yada",
    synchronize: true,
    logging: true,
    entities: [User],
    subscribers: [],
    migrations: [],
})