import {

} from '../controllers/routes';

const router = require("express").Router();

router.get("/get", getPaginatedLocalRoutesHandler);
router.get("/get/:routeId", getInvididualRouterHandler);
router.post("/create", createRouteHandler);
router.put("/update/:routeId", updateRouteHandler);
router.delete("/delete/:routeId", deleteRouteHandler);

export default router;