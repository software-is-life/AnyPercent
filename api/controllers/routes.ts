import { NextFunction, Request, Response } from "express";
import { generateS2BigIntIds } from '../utils/locationUtils';
import {
    createRoute,
    retrieveRoute,
    updateRoute,
    deleteRoute,
    retrieveRoutes
} from '../services/routes';

export const getRoutesHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    let currentS2LocationCellId = generateS2BigIntIds(req);
    let skip = Number(req.query.skip);
    let limit = Number(req.query.limit);

    try {
        const paginatedRoutes = await retrieveRoutes(currentS2LocationCellId, skip, limit);
        return res.status(201).json({
            data: {
                paginatedRoutes
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

// export const getRouteHandler = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ): Promise<Response> => {
//
// }
//
// export const createRouteHandler = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ): Promise<Response> => {
//
// }
//
// export const updateRouteHandler = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ): Promise<Response> => {
//
// }
//
// export const deleteRouteHandler = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ): Promise<Response> => {
//
// }