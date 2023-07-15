import { CityMap } from '../entity/CityMap';
import { AppDataSource } from "../data-source";
import {DeleteResult, Like} from "typeorm";
import {CityMapInput} from "../controllers/controllers";
import {Reviews} from "../entity/Reviews";

const cityMapDataRepository = AppDataSource.getRepository(CityMap);

export const retrieveCityMaps = async (cityId: string,
                                      skip: number,
                                      limit: number): Promise<CityMap[]> => {
    return await cityMapDataRepository.find({
        relations: {
            routes: true,
            events: true,
            places: true,
        },
        where: [
            {
                cityId,
            }
        ],
        order: {
            name: "ASC",
            regionId: "ASC"
        },
        skip: skip,
        take: limit,
    });
};

export const retrieveCityMap = async (cityMapId: string): Promise<CityMap> => {
    return await cityMapDataRepository.findOneBy({
        cityMapId
    });
}

export const createCityMap = async (data: Partial<CityMapInput>, cityId: string, cityRegionId: string): Promise<CityMap> => {
    return await cityMapDataRepository.save(cityMapDataRepository.create({
        regionId: cityRegionId,
        cityId,
        ...data
    }));
};

export const updateCityMap = async (cityMapId: string, data: Partial<CityMapInput>, cityRegionId: string): Promise<CityMap> => {
    const cityMap = await cityMapDataRepository.findOne(
        {
            where: {
                cityMapId
            }
        });
    const newCityMapData = {
        regionId: cityRegionId,
        ...data
    };
    cityMapDataRepository.merge(cityMap, newCityMapData);
    return await cityMapDataRepository.save(cityMap);
};

export const deleteCityMap = async (cityMapId: string): Promise<DeleteResult> => {
    return await cityMapDataRepository.delete({
        cityMapId
    });
};