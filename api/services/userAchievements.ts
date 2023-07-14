import { UserAchievements } from "../entity/UserAchievements";
import { AppDataSource } from "../data-source";
import {DeleteResult} from "typeorm";
import { UserAchievementsInput} from "../controllers/controllers";
import {Geometry} from "geojson";
const wkt = require("wkt");

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
    let newMultiPointString = wkt.parse(userAchievements.placesVisited);
    newMultiPointString.placesVisited = [...newMultiPointString.placesVisited, pointGeometry];
    const newUserAchievementData = {
        placesVisited: newMultiPointString,
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