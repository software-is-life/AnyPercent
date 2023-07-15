import { NextFunction, Request, Response } from "express";
import {createWKTMultiPointString, createWKTPointString} from '../utils/locationUtils';
import {
    createUserAchievement,
    retrieveUserAchievement,
    updateUserAchievement,
    deleteUserAchievement,
    retrieveUserAchievements
} from '../services/UserAchievements';
import {UserAchievements} from "../entity/UserAchievements";
import {UserAchievementsInput} from "./controllers";
import {DeleteResult} from "typeorm";

export const getUserAchievementsHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    let userId = String(req.params.userId);
    let skip = Number(req.query.skip);
    let limit = Number(req.query.limit);

    try {
        const paginatedUserAchievements = await retrieveUserAchievements(userId, skip, limit);
        return res.status(201).json({
            data: {
                paginatedUserAchievements
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

export const getUserAchievementHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    const userAchievementId: string = req.params.routeId;
    try {
        const userAchievement: UserAchievements = await retrieveUserAchievement(userAchievementId);
        return res.status(201).json({
            data: {
                userAchievement
            }
        });
    } catch (err: any) {
        return res.status(500).json({
            status: 'Error Occurred',
            message: err.message,
        });
    }
};

export const createUserAchievementHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    const data: UserAchievementsInput = req.body;

    try {
        if (!data.userId || !data.latitude || !data.longitude) {
            throw new Error("In order to create a UserAchievement you must include a latitude, longitude, and a userId");
        }
        const placeVisitedPoint = createWKTMultiPointString(data.latitude, data.longitude);
        const createdUserAchievement: UserAchievements = await createUserAchievement(data, placeVisitedPoint);
        return res.status(201).json({
            data: {
                createdUserAchievement
            }
        });
    } catch (err: any) {
        return res.status(500).json({
            status: 'Error Occurred',
            message: err.message,
        });
    }
};

export const updateUserAchievementHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    const userAchievementId: string = req.params.userAchievementId;
    const data: Partial<UserAchievementsInput> = req.body;
    const placeVisitedPoint = data.latitude && data.longitude ? createWKTPointString(data.latitude, data.longitude): undefined;
    try {
        const updatedUserAchievement: UserAchievements = await updateUserAchievement(userAchievementId, data, placeVisitedPoint);
        return res.status(201).json({
            data: {
                updatedUserAchievement
            }
        });
    } catch (err: any) {
        return res.status(500).json({
            status: 'Error Occurred',
            message: err.message,
        });
    }
}

export const deleteUserAchievementHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    const userAchievementId: string = req.params.userAchievementId;
    try {
        const deletedUserAchievement: DeleteResult = await deleteUserAchievement(userAchievementId);
        return res.status(201).json({
            data: {
                deletedUserAchievement
            }
        });
    } catch (err: any) {
        return res.status(500).json({
            status: 'Error Occurred',
            message: err.message,
        });
    }
}