import {
    getReviewsHandler,
    getReviewHandler,
    createReviewHandler,
    updateReviewHandler,
    deleteReviewHandler
} from "../controllers/reviews";

const router = require("express").Router();

// CRUD plus get paginated by user
router.get("/get", getReviewsHandler);
router.get("/get/:reviewId", getReviewHandler);
router.post("/create", createReviewHandler);
router.put("/update/:reviewId", updateReviewHandler);
router.delete("/delete/:reviewId", deleteReviewHandler)
export default router;