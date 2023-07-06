import { NextFunction, Request, Response } from "express";
import { generateS2BigIntIds } from '../utils/generateLocationDataMarkers';
import {
    createRoute,
    deleteRoute,
    retrieveIndividualRoute,
    retrieveRoutes,
    updateRoute
} from '../services/routes';
import router from "../routes/routes";

// router.get("/get", getPaginatedLocalRoutesHandler);
// router.get("/get/:routeId", getInvididualRouterHandler);
// router.post("/create", createRouteHandler);
// router.put("/update/:routeId", updateRouteHandler);
// router.delete("/delete/:routeId", deleteRouteHandler);



export const getPaginatedLocalRoutesHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    let currentS2LocationCellId = generateS2BigIntIds(req);
    let skip = req.query.skip;
    let limit = req.query.limit;

    try {
        const paginatedRoutes = await retrieveRoutes(currentS2LocationCellId, skip, limit);
        res.status(201).json({
            data: {
                paginatedRoutes
            },
            skip,
            limit,
        });
    } catch (err: any) {
        console.log(err);
        return res.status(500).json({
            status: 'fail',
            message: err.message,
        })
    }
};