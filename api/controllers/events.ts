import { Request, Response, NextFunction } from "express";
import {
    createEvent,
    retrieveEvent,
    updateEvent,
    deleteEvent,
    retrieveEvents
} from '../services/events';

import {EventInput} from "./controllers";
import {generateS2BigIntIds} from "../utils/locationUtils";
import {validateRetrievingLocations} from "../utils/inputValidation";
import {Events} from "../entity/Events";
import {DeleteResult} from "typeorm";

// TODO: add a data type for Event input, add it .d.ts file
export const getEventsHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    // search query by name or cityRegionId or latitude / longitude pair
    const data = req.query;
    const name = String(data.name);
    const skip = Number(data.skip);
    const limit = Number(data.limit);
    if (validateRetrievingLocations(data)) {
        throw new Error("request query params must at least include one of the following: name, longitude & latitude pair, or cityId");
    }
    const cityRegionId = !data.cityRegionId && data.latitude && data.longitude ? generateS2BigIntIds(req) : undefined;
    try {
        const events: Events[] = await retrieveEvents(cityRegionId, name, skip, limit);
        return res.status(201).json({
            data: {
                events
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

export const getEventHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    const eventId: string = req.params.eventId;
    try {
        const event: Events = await retrieveEvent(eventId);
        return res.status(201).json({
            data: {
                event
            }
        });
    } catch (err: any) {
        return res.status(500).json({
            status: 'Error Occurred',
            message: err.message,
        });
    }
}

export const createEventHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    const data: EventInput = req.body;
    if (!data.latitude || !data.longitude || !data.name || !data.description) {
        throw new Error("request body must at least include name, longitude, latitude, and description");
    }
    const cityRegionId = generateS2BigIntIds(req);
    try {
        const createdEvent: Events = await createEvent(data, cityRegionId);
        return res.status(201).json({
            data: {
                createdEvent
            }
        });
    } catch (err: any) {
        return res.status(500).json({
            status: 'Error Occurred',
            message: err.message,
        });
    }
};

export const updateEventHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    // TODO: validate req.body update. Potentially, use express-validator
    const eventId: string = req.params.eventId;
    const data: EventInput = req.body;
    try {
        const updatedEvent: Events = await updateEvent(eventId, data);
        return res.status(201).json({
            data: {
                updatedEvent
            }
        });
    } catch (err: any) {
        return res.status(500).json({
            status: 'Error Occurred',
            message: err.message,
        });
    }

}

export const deleteEventHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    const eventId: string = req.params.eventId;
    try {
        const deletedEvent: DeleteResult = await deleteEvent(eventId);
        return res.status(201).json({
            data: {
                deletedEvent
            }
        });
    } catch (err: any) {
        return res.status(500).json({
            status: 'Error Occurred',
            message: err.message,
        });
    }
}
