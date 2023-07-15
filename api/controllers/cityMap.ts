import { NextFunction, Request, Response } from "express";
import { generateS2BigIntIds } from '../utils/locationUtils';
import {
    createCityMap,
    retrieveCityMap,
    updateCityMap,
    deleteCityMap
} from '../services/cityMap';
import {CityMap} from "../entity/CityMap";
import {CityMapInput} from "./controllers";
import {DeleteResult} from "typeorm";

export const getCityMapHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    const routeId: string = req.params.routeId;
    try {
        const singleCityMap: CityMap = await retrieveCityMap(routeId);
        return res.status(201).json({
            data: {
                singleCityMap
            }
        });
    } catch (err: any) {
        return res.status(500).json({
            status: 'Error Occurred',
            message: err.message,
        });
    }
};

export const createCityMapHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    const data: CityMapInput = req.body;
    try {
        if (!data.name || !data.country) {
            throw new Error("In order to create a CityMap you must include all of the following: name & country");
        }
        const cityRegionId = generateS2BigIntIds(req);
        const createdCityMap: CityMap = await createCityMap(data, cityRegionId);
        return res.status(201).json({
            data: {
                createdCityMap
            }
        });
    } catch (err: any) {
        return res.status(500).json({
            status: 'Error Occurred',
            message: err.message,
        });
    }
};

export const updateCityMapHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    const routeId: string = req.params.routeId;
    const data: Partial<CityMapInput> = req.body;
    try {
        const updatedCityMap: CityMap = await updateCityMap(routeId, data);
        return res.status(201).json({
            data: {
                updatedCityMap
            }
        });
    } catch (err: any) {
        return res.status(500).json({
            status: 'Error Occurred',
            message: err.message,
        });
    }
}

export const deleteCityMapHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    const routeId: string = req.params.routeId;
    try {
        const deletedCityMap: DeleteResult = await deleteCityMap(routeId);
        return res.status(201).json({
            data: {
                deletedCityMap
            }
        });
    } catch (err: any) {
        return res.status(500).json({
            status: 'Error Occurred',
            message: err.message,
        });
    }
}