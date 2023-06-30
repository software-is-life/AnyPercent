import { AppDataSource } from "./data-source"
import { NextFunction, Request, Response } from "express";
const express = require("express");
import { User } from "./entity/Users";
import * as morgan from "morgan";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import userRouter from './routes/users';


AppDataSource
    .initialize()
    .then(async () => {
        console.log("data source has been initialized");
    })
    .catch(error => console.log(error));

const app = express();

// MIDDLEWARE
app.use(express.json());
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

app.use(cookieParser());

app.use(cors());

// ROUTES
// app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/vq/userAchievements', userAchievementsRouter);
// app.use('/api/photos', photosRouter);

// UNHANDLED ROUTE
// app.all('*', (req: Request, res: Response, next: NextFunction) => {
//     return (new Error("404 encountered"));
// });

app.listen(8080);
console.log(`Server started on port: ${8080}`);