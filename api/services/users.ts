import { User } from '../entity/Users';
import { AppDataSource } from "../data-source";

const userRepository = AppDataSource.getRepository(User);

// EXAMPLE: from another repo
// const router = require('express').Router();
// const User = require("../models/User")
// router.post("/register", async (req,res)=>{
//     const newUser = new User({
//         username:req.body.username,
//         password:req.body.password,
//         email:req.body.email,
//     });
//     try {
//         const user = await newUser.save();
//         res.json(user)
//     }
//     catch(err){
//         res.status(500).json(err)
//     }
//
// })
// module.exports = router

export const createUser = async(user: Partial<User>) => {
    return await userRepository.save(userRepository.create(user));
};

export const retrieveUser = async (userId: string) => {
    return await userRepository.findOneBy({
        userId,
    });
};

export const updateUser = async (userId: string, body: any) => {
    try {
        const property = await userRepository.findOneBy({
            userId,
        });

        return await userRepository.save({
            ...property,
            ...body // updated fields in req body
        });
    } catch (err) {
        console.log(err);
    }
};

export const deleteUser = async(userId: string) => {
    try {
        const userToRemove = await userRepository.findOneBy({
            userId
        });
        return await userRepository.remove(userToRemove);
    } catch (err) {
        console.log(err);
    }
}