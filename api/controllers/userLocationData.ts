import { NextFunction, Request, Response } from "express";
import {
    createUserLocationDataPoint,
    retrieveUserLocationDataPoint,
    deleteUserLocationData,
    retrieveUserLocationDataPoints
} from '../services/userLocationData';
import {UserLocationData} from "../entity/UserLocationData";
import {DeleteResult} from "typeorm";
import {generateS2BigIntIds, createPointString} from "../utils/locationUtils";
import {UserLocationDataInput} from "./controllers";

export const getUsersLocationDataHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    const currentS2LocationCellId = generateS2BigIntIds(req);
    const skip = Number(req.query.skip);
    const limit = Number(req.query.limit);

    try {
        const usersLocationDataPoints = await retrieveUserLocationDataPoints(currentS2LocationCellId, skip, limit);
        return res.status(201).json({
            data: {
                usersLocationDataPoints
            },
            skip,
            limit,
        });
    } catch (err: any) {
        console.log(err);
        return res.status(500).json({
            status: 'Error Occurred',
            message: err.message,
        })
    }
};

export const getUserLocationDataHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    const userId = String(req.query.userId);
    const skip = Number(req.query.skip);
    const limit = Number(req.query.limit);
    try {
        const userLocationDataPoints: UserLocationData[] = await retrieveUserLocationDataPoint(userId, skip, limit);
        return res.status(201).json({
            data: {
                userLocationDataPoints
            }
        });
    } catch (err: any) {
        return res.status(500).json({
            status: 'Error Occurred',
            message: err.message,
        });
    }
};

export const createUserLocationDataHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    const data: UserLocationDataInput = req.body;
    if (!data.latitude || !data.longitude ) {
        throw new Error("In order to create a UserLocationDataPoint you must include all of the following: longitude and latitude ");
    }
    const cityRegionId = generateS2BigIntIds(req);
    const pointString = createPointString(data.latitude, data.longitude);
    try {
        const createdUserLocationDataPoint: UserLocationData = await createUserLocationDataPoint(pointString, cityRegionId);
        return res.status(201).json({
            data: {
                createdUserLocationDataPoint
            }
        });
    } catch (err: any) {
        return res.status(500).json({
            status: 'Error Occurred',
            message: err.message,
        });
    }
};

export const deleteUserLocationDataHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    const userId = String(req.query.userId);
    try {
        const deletedUserLocationDataPoints: DeleteResult = await deleteUserLocationData(userId);
        return res.status(201).json({
            data: {
                deletedUserLocationDataPoints
            }
        });
    } catch (err: any) {
        return res.status(500).json({
            status: 'Error Occurred',
            message: err.message,
        });
    }
}