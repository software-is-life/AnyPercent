import { Routes } from '../entity/Routes';
import { AppDataSource } from "../data-source";

const routesRepository = AppDataSource.getRepository(Routes);

export const retrieveRoutes = async (cellId: string, skip: number, limit: number) => {
    // return paginated Routes routes in an area based
    // on google s2 library cellId, which is calculated
    // from user's longitude and latitude.
    return await routesRepository
        .createQueryBuilder("routes")
        .where("routes.cityRegionId = :cellId", { cellId })
        .skip(skip)
        .take(limit)
        .getMany();
};