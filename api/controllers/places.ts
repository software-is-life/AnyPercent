import { Request, Response, NextFunction } from "express";
import {
    createPlace,
    retrievePlace,
    updatePlace,
    deletePlace,
    retrievePlaces
} from '../services/places';
import {generateS2BigIntIds} from "../utils/locationUtils";
import {PlaceInput} from "./controllers";
import {validateRetrievingLocations} from "../utils/inputValidation";
import {DeleteResult} from "typeorm";
import {Places} from "../entity/Places";
export const getPlacesHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    // search query by name or cityRegionId or latitude / longitude pair
    const data = req.query;
    // TODO: determine more optional way to handle typing of req.query input
    // Current method, is type casting
    const name = String(data.name);
    const skip = Number(data.skip);
    const limit = Number(data.limit);
    if (validateRetrievingLocations(data)) {
        throw new Error("request query params must at least include one of the following: name, longitude & latitude pair, or cityId");
    }
    const cityRegionId = !data.cityRegionId && data.latitude && data.longitude ? generateS2BigIntIds(req) : undefined;
    try {
        const places: Places[] = await retrievePlaces(cityRegionId, name, skip, limit);
        return res.status(201).json({
            data: {
                places
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

export const getPlaceHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    const placeId: string = req.params.placeId;
    try {
        const place: Places = await retrievePlace(placeId);
        return res.status(201).json({
            data: {
                place
            }
        });
    } catch (err: any) {
        return res.status(500).json({
            status: 'Error Occurred',
            message: err.message,
        });
    }
}

export const createPlaceHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    const data: PlaceInput = req.body;
    if (!data.latitude || !data.longitude || !data.name || !data.description) {
        throw new Error("request body must at least include name, longitude, latitude, and description");
    }
    const cityRegionId = generateS2BigIntIds(req);
    try {
        const createdPlace: Places = await createPlace(data, cityRegionId);
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
    // TODO: validate req.body update. Potentially, use express-validator
    const placeId: string = req.params.placeId;
    const data: PlaceInput = req.body;
    try {
        const updatedPlace: Places = await updatePlace(placeId, data);
        return res.status(201).json({
            data: {
                updatedPlace
            }
        });
    } catch (err: any) {
        return res.status(500).json({
            status: 'Error Occurred',
            message: err.message,
        });
    }

}

export const deletePlaceHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    const placeId: string = req.params.placeId;
    try {
        const deletedPlace: DeleteResult = await deletePlace(placeId);
        return res.status(201).json({
            data: {
                deletedPlace
            }
        });
    } catch (err: any) {
        return res.status(500).json({
            status: 'Error Occurred',
            message: err.message,
        });
    }
}
