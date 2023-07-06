import { AppDataSource } from "./data-source"
import { NextFunction, Request, Response } from "express";
const express = require("express");
import { User } from "./entity/Users";
import * as morgan from "morgan";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as googleStrategy from "./authorization/passportStrategies/googleStrategy";
import * as facebookStrategy from "./authorization/passportStrategies/facebookStrategy";
import * as discordStrategy from "./authorization/passportStrategies/discordStrategy";
import * as githubStrategy from "./authorization/passportStrategies/githubStrategy";

// Routers
import authRouter from './routes/auth';
import userRouter from './routes/users';
import userAchievementsRouter from './routes/userAchievements';
import routesRouter from './routes/routes';



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

const session = require('express-session');
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
}));

const passport = require('passport');
passport.use(googleStrategy);
passport.use(facebookStrategy);
passport.use(discordStrategy);
passport.use(githubStrategy);
app.use(passport.session());

// ROUTES
app.use('/api/v1.0/auth', authRouter);
app.use('/api/v1.0/users', userRouter);
app.use('/api/v1.0/userAchievements', userAchievementsRouter);
app.use('/api/v1.0/routes', routesRouter);
// app.use('/api/photos', photosRouter);

// UNHANDLED ROUTE
// app.all('*', (req: Request, res: Response, next: NextFunction) => {
//     return (new Error("404 encountered"));
// });

app.listen(8080);
console.log(`Server started on port: ${8080}`);