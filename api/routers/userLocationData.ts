import {
    getUsersLocationDataHandler,
    getUserLocationDataHandler,
    createUserLocationDataHandler,
    deleteUserLocationDataHandler
} from '../controllers/UserLocationData';

const router = require("express").UserLocationDatar();

router.get("/get", getUsersLocationDataHandler);
router.get("/get/:userLocationDataId", getUserLocationDataHandler);
router.post("/create", createUserLocationDataHandler);
router.delete("/delete/:userId", deleteUserLocationDataHandler);

export default router;