import {
    createUserHandler, deleteUserHandler,
    retrieveUserHandler,
    updateUserHandler
} from '../controllers/users';

const router = require("express").Router();

router.post('/create', createUserHandler);
// TODO: Should these routes be considered admin only?
// TODO: Should I create the same routes without :id param and have a user have access to GET PUT and delete their own profiles with req.session.userId?
router.get('/get/:id', retrieveUserHandler);
router.put('/update/:id', updateUserHandler);
router.delete('/delete/:id', deleteUserHandler);

export default router;