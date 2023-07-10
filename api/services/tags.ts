import { Tags } from '../entity/Tags';
import { AppDataSource } from "../data-source";
import {Events} from "../entity/Events";

const tagsRepository = AppDataSource.getRepository(Tags);
export const  getRelatedItemsWithTags = async (data: any) => {
    let query = tagsRepository
        .createQueryBuilder("tags")
        .relation(Tags, "routes");

    if (data.searchReviews) {
        query = query
            .relation(Tags, "reviews");
    }

    if (data.searchAchievements) {
        query = query
            .relation(Tags, "achievements");
    }

    return query.of(data.tag).loadMany();
};

export const  createTag = async (tagName: string) => {
    return tagsRepository.save(tagsRepository.create({
        tag: tagName
    }));
};

export const retrieveTag = async (tagId: string): Promise<Tags> => {
    return await tagsRepository.findOneBy({
        tagId
    });
};

export const  deleteTag = async (tagId: string) => {
    try {
        const tagToRemove: Tags = await tagsRepository.findOneBy({
            tagId
        });

        return await tagsRepository.remove(tagToRemove);
    } catch (err) {
        console.log(err);
    }
};