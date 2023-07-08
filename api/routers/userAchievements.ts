import {retrieveUserAchievementsHandler} from "../controllers/userAchievements";

const router = require("express").Router();

router.get('/achievements/user/:id', retrieveUserAchievementsHandler);
// TODO: fill out achievements rest of routers

export default router;