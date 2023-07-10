import { CityMap } from '../entity/CityMap';
import { AppDataSource } from "../data-source";
import {DeleteResult, Like} from "typeorm";
import {CityMapInput} from "../controllers/controllers";

const userLocationDataRepository = AppDataSource.getRepository(CityMap);

export const retrieveCityMap = async (cityMapId: string): Promise<CityMap> => {
    return await userLocationDataRepository.findOneBy({
        cityMapId
    });
}

export const createCityMap = async (data: Partial<CityMapInput>, cityRegionId: string): Promise<CityMap> => {
    return await userLocationDataRepository.save(userLocationDataRepository.create({
        regions: [cityRegionId],
        ...data
    }));
};

export const updateCityMap = async (cityMapId: string, data: Partial<CityMapInput>): Promise<CityMap> => {
    const cityMap = await userLocationDataRepository.findOne(
        {
            where: {
                cityMapId
            }
        });
    const newCityMapData = {
        regions: [data.regionsId, ...cityMap.regions],
        ...data
    };
    userLocationDataRepository.merge(cityMap, newCityMapData);
    return await userLocationDataRepository.save(cityMap);
};

export const deleteCityMap = async (cityMapId: string): Promise<DeleteResult> => {
    return await userLocationDataRepository.delete({
        cityMapId
    });
};