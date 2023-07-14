import {
    createUserAchievementHandler,
    deleteUserAchievementHandler,
    getUserAchievementHandler,
    getUserAchievementsHandler,
    updateUserAchievementHandler
} from "../controllers/userAchievements";

const router = require("express").Router();

router.get("/get/user/:userId", getUserAchievementsHandler);
router.get("/get/:userAchievementId", getUserAchievementHandler);
router.post("/create", createUserAchievementHandler);
router.put("/update/:userAchievementId", updateUserAchievementHandler);
router.delete("/delete/:userAchievementId", deleteUserAchievementHandler);
export default router;