import {
    createAchievementHandler,
    deleteAchievementHandler,
    getAchievementHandler,
    getAchievementsHandler,
    updateAchievementHandler
} from "../controllers/Achievements";

const router = require("express").Router();

router.get("/get", getAchievementsHandler);
router.get("/get/:achievementId", getAchievementHandler);
router.post("/create", createAchievementHandler);
router.put("/update/:achievementId", updateAchievementHandler);
router.delete("/delete/::achievementId", deleteAchievementHandler);
export default router;