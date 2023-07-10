import { Routes } from '../entity/Routes';
import { AppDataSource } from "../data-source";

const routesRepository = AppDataSource.getRepository(Routes);

// use spread to update user one-to-many and many-to-many relations
// let arrBar = [10, 20, 30, 40, 50];

// let newBar = [...arrBar,  60, 70, 99];

// console.log(arrBar);
// console.log(newBar);

export const retrieveRoutes = async (cellId: string, skip: number, limit: number) => {
    // return paginated Routes, routers in an area based
    // on Google s2 library cellId, which is calculated
    // from user's longitude and latitude.
    return await routesRepository
        .createQueryBuilder("routes")
        .where("routers.cityRegionId = :cellId", { cellId })
        .skip(skip)
        .take(limit)
        .getMany();
};
// TODO: fill out rest of CRUD rest services functions
export const createRoute = async () => {

}

export const retrieveRoute = async () => {

}

export const updateRoute = async () => {

}

export const deleteRoute = async () => {

}