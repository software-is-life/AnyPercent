import { UserAchievements } from "../entity/UserAchievements";
import { AppDataSource } from "../data-source";
import {DeleteResult} from "typeorm";
import { UserAchievementsInput} from "../controllers/controllers";
import {Geometry} from "geojson";
import * as wkx from "wkx";
import {MultiPoint, Point} from "wkx";

const userAchievementsRepository = AppDataSource.getRepository(UserAchievements);
export const retrieveUserAchievements = async (userId: string,
                                               skip: number,
                                               limit: number): Promise<UserAchievements[]> => {
    return await userAchievementsRepository.find({
        relations: {
            user: true,
            achievement: true,
        },
        where: {
            uid: userId
        },
        order: {
            updatedAt: "DESC"
        },
        skip: skip,
        take: limit,
    });
};

export const retrieveUserAchievement = async (userAchievementId: string): Promise<UserAchievements> => {
    return await userAchievementsRepository.findOne({
        where: {
            userAchievementId
        }
    });
}

export const createUserAchievement = async (data: Partial<UserAchievementsInput>, pointGeometry: string): Promise<UserAchievements> => {
    return await userAchievementsRepository.save(userAchievementsRepository.create({
        status: data.status,
        placesVisited: pointGeometry,
        uid: data.userId,
    }));
};

export const updateUserAchievement = async (userAchievementId: string, data: Partial<UserAchievementsInput>, pointGeometry: string): Promise<UserAchievements> => {
    const userAchievements = await userAchievementsRepository.findOne(
        {
            where: {
                userAchievementId
            }
        });
    let newMultiPointString: any = wkx.Geometry.parse(userAchievements.placesVisited).toGeoJSON();
    let pointToAdd: any = wkx.Geometry.parse(pointGeometry).toGeoJSON();
    const coords = pointToAdd.coordinates;
    newMultiPointString.coordinates = [ ...newMultiPointString.coordinates, [coords[0], coords[1]] ];

    const newUserAchievementData = {
        placesVisited: wkx.Geometry.parseGeoJSON(newMultiPointString).toWkt(),
        ...data
    };
    userAchievementsRepository.merge(userAchievements, newUserAchievementData);
    return await userAchievementsRepository.save(userAchievements);
};

export const deleteUserAchievement = async (userAchievementId: string): Promise<DeleteResult> => {
    return await userAchievementsRepository.delete({
        userAchievementId
    });
}