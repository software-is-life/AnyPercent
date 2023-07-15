import { Achievements } from "../entity/Achievements";
import { AppDataSource } from "../data-source";
import {DeleteResult, Like} from "typeorm";
import {AchievementsInput, UpdateAchievementsInput} from "../controllers/controllers";
import * as wkx from "wkx";

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
            ...(name && { name: Like(`%${name}%`), }),

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

export const createAchievement = async (data: Partial<AchievementsInput>, startingAchievementWKTPoint: string): Promise<Achievements> => {
    return await achievementsRepository.save(achievementsRepository.create({
        placesToVisit: startingAchievementWKTPoint,
        ...data
    }));
};

export const updateAchievement = async (achievementId: string, data: Partial<UpdateAchievementsInput>, locationMultiPoint: string): Promise<Achievements> => {
    const achievement: Achievements = await achievementsRepository.findOneBy({
        achievementId
    });
    let updatedAchievement: Achievements = {
        ...achievement
    };
    let newMultiPointString: any = wkx.Geometry.parse(updatedAchievement.placesToVisit).toGeoJSON();
    if (data.addOrRemovePoint) {
        const pointToTransform: any = wkx.Geometry.parse(locationMultiPoint).toGeoJSON();
        const coords = pointToTransform.coordinates[0];
        console.log(coords);
        if (data.addOrRemovePoint === "add") {
            newMultiPointString.coordinates = [ ...newMultiPointString.coordinates, coords ];
        } else if (data.addOrRemovePoint === "remove") {
            if (newMultiPointString.coordinates.length === 1) {
                throw new Error("Please add a new latitude/longitude pair with POST endpoint. Places To Visit must always have one Latitude/Longitude pair.")
            } else {
                const newCoords =  newMultiPointString.coordinates.filter((item, index) => {
                    return item[0] !== coords[0] && item[1] !== coords[1];
                });
                if (newCoords.length === 0) {
                    throw new Error("Please add a unique new latitude/longitude pair with POST endpoint. Places To Visit must be empty. You attempated to remove a lat/lng pair that would have made Places to visit empty.")
                }
                newMultiPointString.coordinates = newCoords;

            }
        } else {
            throw new Error("add or remove point error");
        };
        updatedAchievement = {
            ...updatedAchievement,
            placesToVisit: wkx.Geometry.parseGeoJSON(newMultiPointString).toWkt()
        };
    } else {
        updatedAchievement = {
            ...updatedAchievement,
            name: data.name,
            description: data.description,
            pointsToAward: data.pointsToAward,
        };
    };
    achievementsRepository.merge(achievement, updatedAchievement);
    return await achievementsRepository.save(achievement);
}

export const deleteAchievement = async (achievementId: string): Promise<DeleteResult> => {
    return await achievementsRepository.delete({
        achievementId
    });
}