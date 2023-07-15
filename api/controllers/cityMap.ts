import { NextFunction, Request, Response } from "express";
import {createCityIdString, generateS2BigIntIds} from '../utils/locationUtils';
import {
    createCityMap,
    retrieveCityMap,
    updateCityMap,
    deleteCityMap, retrieveCityMaps
} from '../services/cityMap';
import {CityMap} from "../entity/CityMap";
import {CityMapInput} from "./controllers";
import {DeleteResult} from "typeorm";

export const getCityMapsHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    const data = req.query;
    const cityId = String(data.cityId);
    // TODO: consider default of skip of 0 and limit of 10 for all skip/limit query params.
    const skip = Number(data.skip);
    const limit = Number(data.limit);

    try {
        if (!data.cityId) {
            throw new Error("request query params must at least have name or partial name param or cityId for query search.");
        }
        const cityMaps: CityMap[] = await retrieveCityMaps(cityId, skip, limit);
        return res.status(201).json({
            data: {
                cityMaps
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

export const getCityMapHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    const cityMapId: string = req.params.cityMapId;
    try {
        const singleCityMap: CityMap = await retrieveCityMap(cityMapId);
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
        if (!data.name || !data.country || !data.latitude || !data.longitude || !data.cityId) {
            throw new Error("In order to create a CityMap you must include all of the following: name, country, cityId, and latitude / longitude pair");
        }
        // @ts-ignore
        const cityRegionId = createCityIdString(data.latitude, data.longitude);
        const createdCityMap: CityMap = await createCityMap(data, data.cityId, cityRegionId);
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
    const cityMapId: string = req.params.cityMapId;
    const data: Partial<CityMapInput> = req.body;
    // @ts-ignore
    const cityRegionId = createCityIdString(data.latitude, data.longitude);
    try {
        const updatedCityMap: CityMap = await updateCityMap(cityMapId, data, cityRegionId);
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
    const cityMapId: string = req.params.cityMapId;
    try {
        const deletedCityMap: DeleteResult = await deleteCityMap(cityMapId);
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