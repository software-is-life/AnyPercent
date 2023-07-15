import { NextFunction, Request, Response } from "express";
import {redisClient} from "../index";
import {AppDataSource} from "../data-source";
import {User} from "../entity/Users";
// import { retrieveGithubAuthorization } from '../services/auth';
let session = require('express-session').Session;

const userRepository = AppDataSource.getRepository(User);

export const loginHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    try {
        // HINT: you will get the email after OAuth2.0 flow
        const tempEmail = "test@example.com";
        const user: User = await userRepository.findOneBy({
            email: tempEmail,
        });
            // @ts-ignore
            req.session.user = user.userId;
        // @ts-ignore
            req.session.email = user.email;
        // @ts-ignore
            req.session.userRole = user.userRole;
            console.log(req.session);
            console.log(req.session.id); // TODO: get this from
            req.session.save((err) => {
                if (err) next(err);
                return res.status(201).json({
                    message: "sup test"
                })
            });

    } catch (err: any) {
        console.error(err);
        return res.status(500).json({
            status: 'fail',
            message: err.message,
        });
    }
};

export const logoutHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    // @ts-ignore
    const { user, id } = req.session;

    req.session.destroy((err) => {
        try {
            redisClient.del("sess:"+id);
        } catch (errRedis: any) {
            console.log(err);
        }
        if (err) {
            console.error('Error performing logout:');
            console.error(err);
        } else if (user) {
            console.info(`Logged out user ${user}.`);
        } else {
            console.info('Logout called by a user without a session.');
        }
    });

    return res.send('OK');
}

// export const githubAuthHandler = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ): Promise<Response> => {
//     try {
//         const githubUser = await retrieveGithubAuthorization(req.query.code);
//         console.log(githubUser);
//         res.status(201).json({
//             data: {
//                 githubUser
//             }
//         })
//     } catch (err: any) {
//         console.error(err);
//         return res.status(500).json({
//             status: 'fail',
//             message: err.message,
//         });
//     }
// };