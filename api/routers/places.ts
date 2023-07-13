import {
    getPlacesHandler,
    getPlaceHandler,
    createPlaceHandler,
    updatePlaceHandler,
    deletePlaceHandler
} from "../controllers/places";

const router = require("express").Router();

// CRUD plus get paginated by user or tag
router.get("/get", getPlacesHandler);
router.get("/get/:placeId", getPlaceHandler);
router.post("/create", createPlaceHandler);
router.put("/update/:placeId", updatePlaceHandler);
router.delete("/delete/:placeId", deletePlaceHandler)
export default router;