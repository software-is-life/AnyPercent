import { Events } from "../entity/Events";
import { AppDataSource } from "../data-source";
import {DeleteResult, Repository} from "typeorm";
import {EventInput} from "../controllers/controllers";

const eventsRepository: Repository<Events> = AppDataSource.getRepository(Events);

export const retrieveEvents = async (cityRegionId: string | undefined,
                                     name: string,
                                     skip: number,
                                     limit: number): Promise<Events[]> => {
    return await eventsRepository.find({
        relations: {
            reviews: true,
            tags: true,
        },
        where: [
            { cityRegionId },
            { name },
        ],
        order: {
            name: "ASC"
        },
        skip: skip,
        take: limit,
    });
};

export const retrieveEvent = async (eventId: string): Promise<Events> => {
    return await eventsRepository.findOneBy({
        eventId
    });
};

export const createEvent = async (data: EventInput, cityRegionId: string): Promise<Events> => {
    // TODO: can destructuring make this easier to read?
    // TODO: how to attach user as author for creating place
    // TODO: how does typeORM and typescript handle potentially empty inputs.
    return await eventsRepository.save(eventsRepository.create({
        cityRegionId,
        ...data
    }));
};

export const updateEvent = async (eventId: string, data: Partial<EventInput>, cityRegionId: string): Promise<Events> => {
    const event = await eventsRepository.findOneBy({
        eventId
    });
    event.cityRegionId = cityRegionId && cityRegionId != "" ? cityRegionId : event.cityRegionId;
    eventsRepository.merge(event, data);
    return await eventsRepository.save(event);
};

export const deleteEvent = async (eventId: string): Promise<DeleteResult> => {
    return await eventsRepository.delete({
        eventId
    });
};