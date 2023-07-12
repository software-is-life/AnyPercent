import {
    githubAuthHandler
} from '../controllers/auth';

const router = require("express").Router();

router.post('/login', loginHandler);
router.get('/logout', logoutHandler);
router.post('/signup', signupHanlder);
router.post('/github/callback', githubAuthHandler);

export default router;