import { NextFunction, Request, Response } from "express";
import {createUser, deleteUser, retrieveUser, updateUser} from '../services/users';

export const createUserHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    try {
        // req.body to user model is pretty strict. Can you use typeorm or typescript
        // optionals?
        const user = await createUser(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                user,
            },
        });
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({
            status: 'fail',
            message: err.message,
        });
        // next(err);
    }
}

export const retrieveUserHandler = async (
    req: Request,
    res: Response,
    nextHandler: NextFunction
): Promise<Response> => {
    try {
        const user = await retrieveUser(req.params.id);
        if (user === null) {
            throw new Error("user not found");
        }
        res.status(201).json({
            status: 'success',
            data: {
                user,
            },
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 'fail',
            message: err.message,
        });
    }
}

export const updateUserHandler = async (
    req: Request,
    res: Response,
    nextHandler: NextFunction
): Promise<Response> => {
    try {
        const user = await updateUser(req.params.id, req.body);
        return res.status(201).json({
            status: 'success',
            data: {
                user,
            },
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: 'fail',
            message: err.message,
        });
    }
};

export const deleteUserHandler = async (
    req: Request,
    res: Response,
    nextHandler: NextFunction
) => {
    try {
        await deleteUser(req.params.id);
        return res.status(201).json({
            status: 'success',
            message: `${req.params.id} user id deleted`,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 'fail',
            message: err.message,
        });
    }
}