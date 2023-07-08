import {
    getPaginatedLocalRoutesHandler
} from '../controllers/routes';

const router = require("express").Router();

router.get("/get", getPaginatedLocalRoutesHandler);
// TODO: fill out the rest of the routers below in controllers & services.
router.get("/get/:routeId", getInvididualRouterHandler);
router.post("/create", createRouteHandler);
router.put("/update/:routeId", updateRouteHandler);
router.delete("/delete/:routeId", deleteRouteHandler);

export default router;