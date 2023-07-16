import { AppDataSource } from "./data-source"
import { NextFunction, Request, Response, Errback } from "express";
const express = require("express");
require("dotenv").config();

// Middleware
import * as morgan from "morgan";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";

// OAUTH2 Strategies
// import * as googleStrategy from "./authorization/passportStrategies/googleStrategy";
// import * as facebookStrategy from "./authorization/passportStrategies/facebookStrategy";
// import * as discordStrategy from "./authorization/passportStrategies/discordStrategy";
// import * as githubStrategy from "./authorization/passportStrategies/githubStrategy";

// REDIS session store
import RedisStore from "connect-redis";
const session = require("express-session");
import {createClient} from 'redis';

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
import * as process from "process";
import {errorLogger, errorResponder} from "./utils/errorUtils";

// CONSTANTS
const ONE_DAY = 1000 * 60; //* 60 * 24;
const ONE_WEEK = ONE_DAY * 7;
const SESSION_SECRET = process.env.SESSION_SECRET;


AppDataSource
    .initialize()
    .then(async () => {
        console.log("data source has been initialized");
    })
    .catch(error => console.log(error));

const app = express();
app.use(express.json());
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))
app.use(cookieParser());
app.use(cors());

// REDIS setup
export let redisClient = createClient({
    // @ts-ignore
    host: 'localhost',
    port: 6379
});
redisClient.connect().catch(console.error);

let redisStore = new RedisStore({
    client: redisClient,
    prefix: process.env.REDIS_SESSION_KEY_PREFIX
})

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: redisStore,
    cookie: {
        maxAge: ONE_DAY,
        secure: false, // only set cookies over https
        httpOnly: true, // don't allow JS code to access cookies
    }
}));

const passport = require('passport');
// passport.use(googleStrategy);
// passport.use(facebookStrategy);
// passport.use(discordStrategy);
// passport.use(githubStrategy);
app.use(passport.session());
// TODO: include passkey authentication

// ROUTES -- /api/v1.0
app.use('/api/v1.0/authentication', authRouter);
app.use('/api/v1.0/users', userRouter);
app.use('/api/v1.0/user-location-data', userLocationDataRouter);
app.use('/api/v1.0/user-achievements', userAchievementsRouter);
app.use('/api/v1.0/achievements', achievementsRouter);
app.use('/api/v1.0/routes', routesRouter);
app.use('/api/v1.0/places', placesRouter);
app.use('/api/v1.0/events', eventsRouter);
app.use('/api/v1.0/reviews', reviewsRouter);
app.use('/api/v1.0/city-map', cityMapRouter);
app.use('/api/v1.0/tags', tagsRouter);

// TODO: include more middleware, especially auth.
// UNHANDLED ROUTEb
app.use(errorLogger);
// app.use(errorResponder);

app.listen(8080);
console.log(`Server started on port: ${8080}`);