import {AppDataSource} from "../data-source";
import {User} from "../entity/Users";

const userRepository = AppDataSource.getRepository(User);

export const retrieveUserAchievements = async (userId: string) => {
    // TODO: include third join from achievements to userAchievements
    return await userRepository
        .createQueryBuilder("user")
        .innerJoinAndSelect(
            "user.userAchievements",
            "userAchievements"
        )
        .where("user.userId = :id", { id: userId})
        .getMany();
}