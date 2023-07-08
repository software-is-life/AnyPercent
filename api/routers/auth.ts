import {
    githubAuthHandler
} from '../controllers/auth';

const router = require("express").Router();

router.post('/github/callback', githubAuthHandler);

export default router;