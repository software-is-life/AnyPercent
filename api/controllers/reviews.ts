import { Request, Response, NextFunction } from "express";
import {
    createReview,
    retrieveReview,
    updateReview,
    deleteReview,
    retrieveReviews
} from '../services/reviews';
import {ReviewInput} from "./controllers";
import {Reviews} from "../entity/Reviews";
import {DeleteResult} from "typeorm";

export const getReviewsHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    // search query by title, description, and/or rating
    const data = req.query;
    const title = String(data.title);
    const description = String(data.description);
    const rating = Number(data.rating);
    const skip = Number(data.skip);
    const limit = Number(data.limit);

    try {
        if (!title) {
            throw new Error("request query params must at least have title param for query search. description & rating are optional parameters.");
        }
        const reviews: Reviews[] = await retrieveReviews(title, description, rating, skip, limit);
        return res.status(201).json({
            data: {
                reviews
            },
            skip,
            limit,
        });
    } catch (err: any) {
        return res.status(500).json({
            status: 'Error Occurred',
            message: err.message,
        });
    }
}

export const getReviewHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    const reviewId: string = req.params.reviewId;
    try {
        const review: Reviews = await retrieveReview(reviewId);
        return res.status(201).json({
            data: {
                review
            }
        });
    } catch (err: any) {
        return res.status(500).json({
            status: 'Error Occurred',
            message: err.message,
        });
    }
}

export const createReviewHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    const data: ReviewInput = req.body;

    try {
        if (!data.title || !data.description || !data.rating) {
            throw new Error("request body must at least include title, description, and a rating");
        }
        const createdReview: Reviews = await createReview(data);
        return res.status(201).json({
            data: {
                createdReview
            }
        });
    } catch (err: any) {
        return res.status(500).json({
            status: 'Error Occurred',
            message: err.message,
        });
    }
};

export const updateReviewHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    // TODO: validate req.body update. Potentially, use express-validator
    const reviewId: string = req.params.reviewId;
    const data: ReviewInput = req.body;
    try {
        const updatedReview: Reviews = await updateReview(reviewId, data);
        return res.status(201).json({
            data: {
                updatedReview
            }
        });
    } catch (err: any) {
        return res.status(500).json({
            status: 'Error Occurred',
            message: err.message,
        });
    }

}

export const deleteReviewHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    const reviewId: string = req.params.reviewId;
    try {
        const deletedReview: DeleteResult = await deleteReview(reviewId);
        return res.status(201).json({
            data: {
                deletedReview
            }
        });
    } catch (err: any) {
        return res.status(500).json({
            status: 'Error Occurred',
            message: err.message,
        });
    }
}