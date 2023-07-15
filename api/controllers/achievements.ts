import { Request, Response, NextFunction } from "express";
import {
    createAchievement,
    retrieveAchievement,
    updateAchievement,
    deleteAchievement,
    retrieveAchievements
} from '../services/achievements';
import {generateS2BigIntIds} from "../utils/locationUtils";
import {AchievementsInput} from "./controllers";
import {DeleteResult} from "typeorm";
import {Achievements} from "../entity/Achievements";
export const getAchievementsHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    // search query by name or retrieve a general list of Achievements
    const data = req.query;
    const name = String(data.name);
    const skip = Number(data.skip);
    const limit = Number(data.limit);

    try {
        const achievements: Achievements[] = await retrieveAchievements(name, skip, limit);
        return res.status(201).json({
            data: {
                achievements
            },
            skip,
            limit,
        });
    } catch (err: any) {
        return res.status(500).json({
            status: 'Error Occurred',
            message: err.message,
        });
    }
}
export const getAchievementHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    const achievementId: string = req.params.achievementId;
    try {
        const achievement: Achievements = await retrieveAchievement(achievementId);
        return res.status(201).json({
            data: {
                achievement
            }
        });
    } catch (err: any) {
        return res.status(500).json({
            status: 'Error Occurred',
            message: err.message,
        });
    }
}

export const createAchievementHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    const data: AchievementsInput = req.body;
    try {
        if ( !data.name || !data.description) {
            throw new Error("request body must at least include name and description");
        }
        const cityRegionId = generateS2BigIntIds(req);
        const createdAchievement: Achievements = await createAchievement(data);
        return res.status(201).json({
            data: {
                createdAchievement
            }
        });
    } catch (err: any) {
        return res.status(500).json({
            status: 'Error Occurred',
            message: err.message,
        });
    }
};

export const updateAchievementHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    const achievementId: string = req.params.achievementId;
    const data: Partial<AchievementsInput> = req.body;
    try {
        const updatedAchievement: Achievements = await updateAchievement(achievementId, data);
        return res.status(201).json({
            data: {
                updatedAchievement
            }
        });
    } catch (err: any) {
        return res.status(500).json({
            status: 'Error Occurred',
            message: err.message,
        });
    }

}

export const deleteAchievementHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    const achievementId: string = req.params.achievementId;
    try {
        const deletedAchievement: DeleteResult = await deleteAchievement(achievementId);
        return res.status(201).json({
            data: {
                deletedAchievement
            }
        });
    } catch (err: any) {
        return res.status(500).json({
            status: 'Error Occurred',
            message: err.message,
        });
    }
}
