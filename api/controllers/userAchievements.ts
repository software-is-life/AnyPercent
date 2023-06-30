import { NextFunction, Request, Response } from "express";

export const retrieveUserAchievementsHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    try {
        const userAchievements = await getUserAchievements(req.params.id);
        // TODO: incorporate pagination with user achievements if needed
        // typeorm pagination: https://typeorm.io/select-query-builder#using-pagination
        res.status(201).json({
            data: {
                userAchievements
            },
        });
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({
            status: 'fail',
            message: err.message,
        });
    }
}