import { NextFunction, Request, Response } from "express";
import {createCityIdString, generateS2BigIntIds} from '../utils/locationUtils';
import {
    createRoute,
    retrieveRoute,
    updateRoute,
    deleteRoute,
    retrieveRoutes
} from '../services/routes';
import {Routes} from "../entity/Routes";
import {RouteInput} from "./controllers";
import {DeleteResult} from "typeorm";

export const getRoutesHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    try {
        const data = req.query;
        // @ts-ignore
        let cityId = String(data.cityId);
        let skip = Number(data.skip);
        let limit = Number(data.limit)
        const paginatedRoutes = await retrieveRoutes(cityId, skip, limit);
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

export const getRouteHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    const routeId: string = req.params.routeId;
    try {
        const route: Routes = await retrieveRoute(routeId);
        return res.status(201).json({
            data: {
                route
            }
        });
    } catch (err: any) {
        return res.status(500).json({
            status: 'Error Occurred',
            message: err.message,
        });
    }
};

export const createRouteHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    const data: RouteInput = req.body;
    try {
        if (!data.name || !data.description || !data.latitude || !data.longitude ) {
            throw new Error("In order to create a Route you must include all of the following: name, description, longitude, and latitude ");
        }
        const cityRegionId = createCityIdString(data.latitude, data.longitude);
        const createdRoute: Routes = await createRoute(data, cityRegionId);
        return res.status(201).json({
            data: {
                createdRoute
            }
        });
    } catch (err: any) {
        return res.status(500).json({
            status: 'Error Occurred',
            message: err.message,
        });
    }
};

export const updateRouteHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    const routeId: string = req.params.routeId;
    const data: Partial<RouteInput> = req.body;
    try {
        const updatedRoute: Routes = await updateRoute(routeId, data);
        return res.status(201).json({
            data: {
                updatedRoute
            }
        });
    } catch (err: any) {
        return res.status(500).json({
            status: 'Error Occurred',
            message: err.message,
        });
    }
}

export const deleteRouteHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    const routeId: string = req.params.routeId;
    try {
        const deletedRoute: DeleteResult = await deleteRoute(routeId);
        return res.status(201).json({
            data: {
                deletedRoute
            }
        });
    } catch (err: any) {
        return res.status(500).json({
            status: 'Error Occurred',
            message: err.message,
        });
    }
}