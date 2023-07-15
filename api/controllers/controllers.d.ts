import {Routes} from "../entity/Routes";
import {Reviews} from "../entity/Reviews";
import {Achievements} from "../entity/Achievements";
import {Events} from "../entity/Events";
import {Places} from "../entity/Places";
import {Tags} from "../entity/Tags";
import {AchievementStatus} from "../entity/UserAchievements";
import { Session } from 'express-session';

export type RelatedItems = Routes | Reviews | Achievements;
export type RatingNumbers = 1 | 2 | 3 | 4 | 5;
export type ValidRoutesEntity =  Events | Places | Achievements | Tags;

// export interface UserInput {
//
// };
//
// export interface TagInput {
//
// };

export interface LocationDetailsBase {
    name: string;
    description: string;
    latitude: number;
    longitude: number;
}

export interface PlaceInput extends LocationDetailsBase{
    address: string;
    phone?: string;
    hoursOfOperation?: string
    website?: string;
    rating?: number;
}

export interface EventInput extends LocationDetailsBase {}

export interface RouteInput extends LocationDetailsBase {
    achievementIds?: string[];
    eventIds?: string[];
    placeIds?: string[];
    tagIds?: string[];
}

export interface ReviewInput {
    title: string;
    description: string;
    rating: RatingNumbers;
}

export interface UserLocationDataInput {
    latitude: number;
    longitude: number;
    userId: string;
}

export interface CityMapInput {
    name: string;
    country: string;
    province?: string;
    regionsId?: string;
}

export interface UserAchievementsInput {
    latitude: number;
    longitude: number;
    userId: string;
    status?: AchievementStatus;
}

export interface AchievementsInput {
    name: string;
    description: string;
    pointsToAward: number;
    latitude: number;
    longitude: number;
}

export interface UpdateAchievementsInput extends AchievementsInput{
    addOrRemovePoint: "add" | "remove";
}