import { Achievements } from "../entity/Achievements";
import { AppDataSource } from "../data-source";
import {DeleteResult} from "typeorm";
import {AchievementsInput} from "../controllers/controllers";

const achievementsRepository = AppDataSource.getRepository(Achievements);

export const retrieveAchievements = async (name: string,
                                     skip: number,
                                     limit: number): Promise<Achievements[]> => {
    return await achievementsRepository.find({
        relations: {
            tags: true,
            routes: true,
        },
        where: {
            ...(name && { name }),
        },
        order: {
            name: "ASC"
        },
        skip: skip,
        take: limit,
    });
};

export const retrieveAchievement = async (achievementId: string): Promise<Achievements> => {
    return await achievementsRepository.findOneBy({
        achievementId
    });
}

export const createAchievement = async (data: Partial<AchievementsInput>): Promise<Achievements> => {
    return await achievementsRepository.save(achievementsRepository.create({
        ...data
    }));
};

export const updateAchievement = async (achievementId: string, data: Partial<AchievementsInput>): Promise<Achievements> => {
    const achievement = await achievementsRepository.findOneBy({
        achievementId
    });
    achievementsRepository.merge(achievement, data);
    return await achievementsRepository.save(achievement);
}

export const deleteAchievement = async (achievementId: string): Promise<DeleteResult> => {
    return await achievementsRepository.delete({
        achievementId
    });
}