import { Tags } from '../entity/Tags';
import { AppDataSource } from "../data-source";
import {Events} from "../entity/Events";

const tagsRepository = AppDataSource.getRepository(Tags);
export const  getRelatedItemsWithTags = async (tagName: string, skip: number, limit: number) => {
    return await tagsRepository.find({
        relations: {
            reviews: true,
            routes: true,
            events: true,
            places: true,
            achievements: true
        },
        where: {
            ...(tagName && {tag: tagName})
        },
        order: {
            createdAt: "DESC"
        },
        skip: skip,
        take: limit,
    });
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