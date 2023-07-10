import {Routes} from "../entity/Routes";
import {Reviews} from "../entity/Reviews";
import {Achievements} from "../entity/Achievements";
import {Events} from "../entity/Events";
import {Places} from "../entity/Places";
import {Tags} from "../entity/Tags";
import {AchievementStatus} from "../entity/UserAchievements";

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
    latitude: string;
    longitude: string;
}

export interface PlaceInput extends LocationDetailsBase{
    address: string;
    phone?: string;
    hoursOfOperation?: string[]
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
    latitude: string;
    longitude: string;
}

export interface CityMapInput {
    name: string;
    country: string;
    province?: string;
    regionsId?: string;
}

export interface UserAchievementsInput {
    latitude: string;
    longitude: string;
    userId: string;
    status?: AchievementStatus;
}

export interface AchievementsInput {
    name: string;
    description: string;
}