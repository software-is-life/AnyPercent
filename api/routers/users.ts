import {
    createUserHandler, deleteUserHandler,
    retrieveUserHandler,
    updateUserHandler
} from '../controllers/users';

const router = require("express").Router();

router.post('/create', createUserHandler);
router.get('/get/:id', retrieveUserHandler);
router.put('/update/:id', updateUserHandler);
router.delete('/delete/:id', deleteUserHandler);

export default router;