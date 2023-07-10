import { AppDataSource } from "./data-source"
// import { NextFunction, Request, Response } from "express";
const express = require("express");
import * as morgan from "morgan";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as googleStrategy from "./authorization/passportStrategies/googleStrategy";
import * as facebookStrategy from "./authorization/passportStrategies/facebookStrategy";
import * as discordStrategy from "./authorization/passportStrategies/discordStrategy";
import * as githubStrategy from "./authorization/passportStrategies/githubStrategy";

// Routers
import authRouter from './routers/auth';
import userRouter from './routers/users';
import userAchievementsRouter from './routers/userAchievements';
import routesRouter from './routers/routes';
import placesRouter from './routers/places';
import tagsRouter from './routers/tags';
import userLocationDataRouter from './routers/userLocationData';
import achievementsRouter from './routers/achievements';
import eventsRouter from './routers/events';
import reviewsRouter from './routers/reviews';
import cityMapRouter from './routers/cityMap';



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
// TODO: include passkey authentication

// ROUTES -- /api/v1.0
app.use('/api/v1.0/auth', authRouter);
app.use('/api/v1.0/users', userRouter);
app.use('/api/v1.0/user-location-data', userLocationDataRouter);
app.use('/api/v1.0/user-achievements', userAchievementsRouter);
app.use('/api/v1.0/achievements', achievementsRouter);
app.use('/api/v1.0/routers', routesRouter);
app.use('/api/v1.0/places', placesRouter);
app.use('/api/v1.0/events', eventsRouter);
app.use('/api/v1.0/reviews', reviewsRouter);
app.use('/api/v1.0/city-map', cityMapRouter);
app.use('/api/v1.0/tags', tagsRouter);

// TODO: include more middleware, especially auth.
// UNHANDLED ROUTE
// app.all('*', (req: Request, res: Response, next: NextFunction) => {
//     return (new Error("404 encountered"));
// });

app.listen(8080);
console.log(`Server started on port: ${8080}`);