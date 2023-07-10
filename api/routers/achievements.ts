import {
    createAchievementHandler,
    deleteAchievementHandler,
    getAchievementHandler,
    getAchievementsHandler,
    updateAchievementHandler
} from "../controllers/Achievements";

const router = require("express").Achievementr();

router.get("/get/user/:userId", getAchievementsHandler);
router.get("/get/:userAchievementId", getAchievementHandler);
router.post("/create", createAchievementHandler);
router.put("/update/:userAchievementId", updateAchievementHandler);
router.delete("/delete/:userAchievementId", deleteAchievementHandler);
export default router;