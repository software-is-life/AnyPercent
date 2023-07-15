import { NextFunction, Request, Response } from "express";
import {createUser, deleteUser, retrieveUser, updateUser} from '../services/users';
import {
    createCityIdString,
    createWKTPointString,
} from "../utils/locationUtils";
const s2 = require('@radarlabs/s2');

export const createUserHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    try {
        // req.body to user model is pretty strict. Can you use typeorm or typescript
        // optionals?
        const data = req.body;
        const newUser = {
            firstName: data.firstName,
            lastName: data.lastName,
            age: data.age,
            email: data.email,
            homeCityId: createCityIdString(data.latitude, data.longitude),
            locationCoordinates: createWKTPointString(data.latitude, data.longitude),
            points: data.points,
        };
        const user = await createUser(newUser);
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

// TODO: retrieve what related user items

export const updateUserHandler = async (
    req: Request,
    res: Response,
    nextHandler: NextFunction
): Promise<Response> => {
    try {
        let data = req.body;
        if (data.longitude && data.latitude) {
            data = {
                ...data,
                homeCityId: createCityIdString(data.latitude, data.longitude),
                locationCoordinates: createWKTPointString(data.latitude, data.longitude),
            };
            // need to delete in order for this to not get returned to user.
            delete data["latitude"];
            delete data["longitude"];
        }
        const user = await updateUser(req.params.id, data);
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