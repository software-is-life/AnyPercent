import {retrieveUserAchievementsHandler} from "../controllers/userAchievements";

const router = require("express").Router();

router.get('/achievements/user/:id', retrieveUserAchievementsHandler);

export default router;