import { NextFunction, Request, Response } from "express";
import { retrieveGithubAuthorization } from '../services/auth';

export const githubAuthHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    try {
        const githubUser = await retrieveGithubAuthorization(req.query.code);
        console.log(githubUser);
        res.status(201).json({
            data: {
                githubUser
            }
        })
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({
            status: 'fail',
            message: err.message,
        });
    }
}