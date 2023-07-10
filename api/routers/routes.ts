import {
    getRoutesHandler,
    getRouteHandler,
    createRouteHandler,
    updateRouteHandler,
    deleteRouteHandler
} from '../controllers/routes';

const router = require("express").Router();

router.get("/get", getRoutesHandler);
router.get("/get/:routeId", getRouteHandler);
router.post("/create", createRouteHandler);
router.put("/update/:routeId", updateRouteHandler);
router.delete("/delete/:routeId", deleteRouteHandler);

export default router;