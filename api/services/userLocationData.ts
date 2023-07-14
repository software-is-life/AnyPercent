import { UserLocationData } from "../entity/UserLocationData";
import { AppDataSource } from "../data-source";
import {DeleteResult} from "typeorm";

const userLocationDataRepository = AppDataSource.getRepository(UserLocationData);
export const retrieveUserLocationDataPoints = async (cityRegionId: string,
                                                     skip: number,
                                                     limit: number): Promise<UserLocationData[]> => {
    return await userLocationDataRepository.find({
        relations: {
            user: true
        },
        where: {
            ...(cityRegionId && {cityRegionId})
        },
        order: {
            createdAt: "DESC"
        },
        skip: skip,
        take: limit,
    });
};

export const retrieveUserLocationDataPoint = async (userId: string,
                                                    skip: number,
                                                    limit: number): Promise<UserLocationData[]> => {
    return await userLocationDataRepository.find({
        relations: {
            user: true
        },
        where: {
            ...(userId && {uid: userId})
        },
        order: {
            createdAt: "DESC"
        },
        skip: skip,
        take: limit,
    });
}

export const createUserLocationDataPoint = async (location: string, cityRegionId: string): Promise<UserLocationData> => {
    return await userLocationDataRepository.save(userLocationDataRepository.create({
        location,
        cityRegionId
    }));
};

export const deleteUserLocationData = async (userId: string): Promise<DeleteResult> => {
    return await userLocationDataRepository.delete({
        uid: userId
    });
}