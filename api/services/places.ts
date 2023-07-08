import { Places } from "../entity/Places";
import { AppDataSource } from "../data-source";

const placesRepository = AppDataSource.getRepository(Places);

export const createPlace = async (data: any, cityRegionId: string): Promise<Places> => {
    // TODO: can destructuring make this easier to read?
    // TODO: how to attach user as author for creating place
    // TODO: how does typeORM and typescript handle potentially empty inputs.
    return placesRepository.save(placesRepository.create({
        cityRegionId,
        name: data.name,
        description: data.description,
        address: data.address,
        phone: data.phone,
        hoursOfOperation: data.hoursOfOperation,
        website: data.website,
    }));
}