import { Request, Response, NextFunction } from "express";
import {
    createTag,
    deleteTag,
    getRelatedItemsWithTags
} from '../services/tags';
import {Tags} from "../entity/Tags";
import {RelatedItems} from "./controllers";

export const getTagRelatedItemsHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    try {
        const data = req.query;

        if (!data.tagName || data.tagName === "") {
            throw new Error("Related Items cannot be retrieved without a valid tag name.")
        }
        const relatedItems: RelatedItems[] = await getRelatedItemsWithTags(data);
        return res.status(201).json({
            message: `Related Items associated with Tag Name ${data.tagName}`,
            data: {
                relatedItems
            },
        });
    } catch (err: any) {
        console.log(err);
        return res.status(500).json({
            status: 'Error Occurred',
            message: err.message,
        })
    }
};

export const createTagHandler = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    try {
        const data = req.body;
        if (!data.tag || data.tag === "") {
            throw new Error("request body needs a non-empty and non-null tag to add.");
        }

        const createdTag: Tags = await createTag(data.tag);
        return res.status(201).json({
            data: {
                createdTag
            }
        });
    } catch (err: any) {
        return res.status(500).json({
            status: 'Error Occurred',
            message: err.message,
        });
    }
};

export const deleteTagHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    let tagId: string = req.params.tagId;
    try {
        const deletedTag: Tags = await deleteTag(tagId);
        return res.status(201).json({
            message: `Tag Id ${tagId} and Tag name ${deletedTag.tag} successfuly deleted`
        });
    } catch (err: any) {
        console.log(err);
        return res.status(500).json({
            status: 'Error Occurred',
            message: err.message,
        })
    }
};