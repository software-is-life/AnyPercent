import { Request, Response, NextFunction } from "express";
import {
    createPlace,
    retrievePlace,
    updatePlace,
    deletePlace,
    retrievePlaces
} import from '../services/places';
import {generateS2BigIntIds} from "../utils/generateLocationDataMarkers";

;
// getPaginatedPlacesHandler,
//     getPlaceHandler,
//     createPlaceHandler,
//     updatePlaceHandler,
//     deletePlaceHandler

export const getPlacesHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {

}

export const getPlaceHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {

}

export const createPlaceHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    const data = req.body;
    if (!data.latitude || !data.longitude || !data.name || !data.description) {
        throw new Error("request body must at least include name, longitude, latitude, and description");
    }
    const cityRegionId = generateS2BigIntIds(req);
    try {
        const createdPlace = await createPlace(data, cityRegionId);
        return res.status(201).json({
            data: {
                createdPlace
            }
        });
    } catch (err: any) {
        return res.status(500).json({
            status: 'Error Occurred',
            message: err.message,
        });
    }
};

export const updatePlaceHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {

}

export const deletePlaceHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {

}
