import {redisClient} from "../index";

export const isAuthenticated = async (req, res, next) => {
    // @ts-ignore
    const { id } = req.session;
    if (await redisClient.get(process.env.REDIS_SESSION_KEY_PREFIX+id) !== null) {
        next();
    } else {
        res.status(403).send('FORBIDDEN - you need to log back in to refresh your user\'s session token or sign up and create your user profile.');
    }
};

export const isAdmin = (req, res, next) => {
    // @ts-ignore
    const { userRole } = req.session;
    if (userRole === "admin"){
        return next();
    } else {
        res.status(401).send('UNAUTHORIZED - you are not authorized access this API endpoint with your user role.');
    }
};

export const isOwner = (req, res, next) => {
    // @ts-ignore
    const { userRole } = req.session;
    if (userRole === "admin" || userRole === "owner"){
        next();
    } else {
        res.status(401).send('UNAUTHORIZED - you are not authorized access this API endpoint with your user role.');
    }
};

export const isUser = (req, res, next) => {
    // @ts-ignore
    const { userRole, user } = req.session;
    if ((userRole === "admin" || userRole === "owner" || userRole === "user" ) && (req.params.id && req.params.id === user)){
        next();
    } else {
        res.status(401).send('UNAUTHORIZED - you are not authorized access this API endpoint with your user role.');
    }
};

