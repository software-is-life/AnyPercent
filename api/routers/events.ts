import {
    getEventsHandler,
    getEventHandler,
    createEventHandler,
    updateEventHandler,
    deleteEventHandler
} from "../controllers/events";

const router = require("express").Router();

// CRUD plus get paginated by user or tag
router.get("/get", getEventsHandler);
router.get("/get/:eventId", getEventHandler);
router.post("/create", createEventHandler);
router.put("/update/:eventId", updateEventHandler);
router.delete("/delete/:eventId", deleteEventHandler)
export default router;