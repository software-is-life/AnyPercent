import { Reviews } from "../entity/Reviews";
import { AppDataSource } from "../data-source";
import {DeleteResult, Repository} from "typeorm";
import {ReviewInput} from "../controllers/controllers";

const reviewsRepository: Repository<Reviews> = AppDataSource.getRepository(Reviews);

export const retrieveReviews = async (title: string,
                                     description: string,
                                     rating: number,
                                     skip: number,
                                     limit: number): Promise<Reviews[]> => {
    // using spread to and conditional object for optional query params rating and description.
    return await reviewsRepository.find({
        relations: {
            tags: true,
        },
        where: [
            {
                title,
                ...(rating && { rating }),
                ...(description && { description })
            }
        ],
        order: {
            rating: "DESC"
        },
        skip: skip,
        take: limit,
    });
};

export const retrieveReview = async (reviewId: string): Promise<Reviews> => {
    return await reviewsRepository.findOneBy({
        reviewId
    });
}

export const createReview = async (data: ReviewInput): Promise<Reviews> => {
    return await reviewsRepository.save(reviewsRepository.create({
        ...data
    }));
};

export const updateReview = async (reviewId: string, data: ReviewInput): Promise<Reviews> => {
    const review = await reviewsRepository.findOneBy({
        reviewId
    });
    reviewsRepository.merge(review, data);
    return await reviewsRepository.save(review);
}

export const deleteReview = async (reviewId: string): Promise<DeleteResult> => {
    return await reviewsRepository.delete({
        reviewId
    });
}