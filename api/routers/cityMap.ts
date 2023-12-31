import {
    getCityMapHandler,
    createCityMapHandler,
    updateCityMapHandler,
    deleteCityMapHandler, getCityMapsHandler
} from "../controllers/cityMap";

const router = require("express").Router();

// CRUD plus get paginated by user or tag
router.get("/get", getCityMapsHandler);
router.get("/get/:cityMapId", getCityMapHandler);
router.post("/create", createCityMapHandler);
router.put("/update/:cityMapId", updateCityMapHandler);
router.delete("/delete/:cityMapId", deleteCityMapHandler)
export default router;