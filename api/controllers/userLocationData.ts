import { NextFunction, Request, Response } from "express";
import {
    createUserLocationDataPoint,
    retrieveUserLocationDataPoint,
    deleteUserLocationData,
    retrieveUserLocationDataPoints
} from '../services/userLocationData';
import {UserLocationData} from "../entity/UserLocationData";
import {DeleteResult} from "typeorm";
import {generateS2BigIntIds, createWKTPointString, createCityIdString} from "../utils/locationUtils";
import {UserLocationDataInput} from "./controllers";

export const getUsersLocationDataHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    const currentS2LocationCellId = createCityIdString(Number(req.query.latitude), Number(req.query.longitude))
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
    const userId = String(req.params.userId);
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

    try {
        if (!data.latitude || !data.longitude || !data.userId) {
            throw new Error("In order to create a UserLocationDataPoint you must include all of the following: longitude and latitude ");
        }
        const cityRegionId: string = createCityIdString(data.latitude, data.longitude);
        const pointGeometry: string = createWKTPointString(data.latitude, data.longitude);
        const createdUserLocationDataPoint: UserLocationData = await createUserLocationDataPoint(data.userId, pointGeometry, cityRegionId);
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