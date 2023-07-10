import { Places } from "../entity/Places";
import { AppDataSource } from "../data-source";
import {DeleteResult} from "typeorm";
import {PlaceInput} from "../controllers/controllers";

const placesRepository = AppDataSource.getRepository(Places);

export const retrievePlaces = async (cityRegionId: string | undefined,
                                     name: string,
                                     skip: number,
                                     limit: number): Promise<Places[]> => {
    return await placesRepository.find({
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

export const retrievePlace = async (placeId: string): Promise<Places> => {
    return await placesRepository.findOneBy({
        placeId
    });
}

export const createPlace = async (data: PlaceInput, cityRegionId: string): Promise<Places> => {
    // TODO: can destructuring make this easier to read?
    // TODO: how to attach user as author for creating place
    // TODO: how does typeORM and typescript handle potentially empty inputs.
    return await placesRepository.save(placesRepository.create({
        cityRegionId,
        ...data
    }));
};

export const updatePlace = async (placeId: string, data: PlaceInput): Promise<Places> => {
    const place = await placesRepository.findOneBy({
        placeId
    });
    placesRepository.merge(place, data);
    return await placesRepository.save(place);
}

export const deletePlace = async (placeId: string): Promise<DeleteResult> => {
    return await placesRepository.delete({
        placeId
    });
}