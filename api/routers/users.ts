import {
    createUserHandler, deleteUserHandler,
    retrieveUserHandler,
    updateUserHandler
} from '../controllers/users';
import {isAuthenticated, isUser} from "../utils/authUtils";

const router = require("express").Router();

router.post('/create', [isAuthenticated, isUser] , createUserHandler);
// TODO: Should these routes be considered admin only?
// TODO: Should I create the same routes without :id param and have a user have access to GET PUT and delete their own profiles with req.session.userId?
router.get('/get/:id', [isAuthenticated, isUser], retrieveUserHandler);
router.put('/update/:id', [isAuthenticated, isUser], updateUserHandler);
router.delete('/delete/:id', [isAuthenticated, isUser], deleteUserHandler);

export default router;