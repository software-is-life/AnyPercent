import { Routes } from '../entity/Routes';
import { AppDataSource } from "../data-source";
import {DeleteResult, Like} from "typeorm";
import {RouteInput, ValidRoutesEntity} from "../controllers/controllers";
import {retrieveEvent} from "./events";
import {retrievePlace} from "./places";
import {retrieveTag} from "./tags";

const routesRepository = AppDataSource.getRepository(Routes);

export const retrieveRoutes = async (cellId: string, skip: number, limit: number) => {
    // return paginated Routes, routers in an area based
    // on Google s2 library cellId, which is calculated
    // from user's longitude and latitude.
    return await routesRepository.find({
        relations: {
            events: true,
            places: true,
            reviews: true,
            achievements: true,
            tags: true,
        },
        where: [
            {cityRegionId: cellId}
        ],
        order: {
            name: "ASC"
        },
        skip: skip,
        take: limit,
    });
};

export const retrieveRoute = async (routeId: string): Promise<Routes> => {
    return await routesRepository.findOneBy({
        routeId
    });
}

export const createRoute = async (data: Partial<RouteInput>, cityRegionId: string): Promise<Routes> => {
    // @ts-ignore
    return await routesRepository.save(routesRepository.create({
        cityRegionId: cityRegionId,
        name: data.name,
        description: data.description
    }));
};

// TODO: Make sure to test this out. Refactor is most likely because it does not feel like the most efficient.
export const updateRoute = async (routeId: string, data: Partial<RouteInput>): Promise<Routes> => {
    const route = await routesRepository.findOne(
        {
            where: {
                routeId
            },
            relations: {
                events: true,
                places: true,
                achievements: true,
                tags: true
            }
        });
    const newData = {
        places: await spreadAndMergeEntity(data.placeIds, "places"),
        events: await spreadAndMergeEntity(data.eventIds, "events"),
        achievements: await spreadAndMergeEntity(data.achievementIds, "achievements"),
        tags: await spreadAndMergeEntity(data.tagIds, "tags"),
    };
    routesRepository.merge(route, newData);
    return await routesRepository.save(route);
}

export const deleteRoute = async (routeId: string): Promise<DeleteResult> => {
    return await routesRepository.delete({
        routeId
    });
}

const spreadAndMergeEntity = async (entityStringArr: string[], category: string): Promise<any[]> => {
    let output = [];
    for (let i = 0; i < entityStringArr.length; i++) {
        let currentElem: string = entityStringArr[i];
        switch (category) {
            case "places":
                output.push(await retrievePlace(currentElem));
                break;
            case "events":
                output.push(await retrieveEvent(currentElem));
                break;
            // case "achievements":
            //     output.push(await retrieveAchievement(currentElem));
            //     break;
            case "tags":
                output.push(await retrieveTag(currentElem));
                break;
            default:
                console.log("something went wrong");
                break;
            }
    }
    return output;
}