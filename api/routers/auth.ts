import {
    loginHandler, logoutHandler
} from '../controllers/auth';
// githubAuthHandler,

const router = require("express").Router();

router.post('/login', loginHandler);
router.get('/logout', logoutHandler);
// router.post('/signup', signupHandler);
// router.post('/github/callback', githubAuthHandler);

export default router;