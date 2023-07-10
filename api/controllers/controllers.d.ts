import {Routes} from "../entity/Routes";
import {Reviews} from "../entity/Reviews";
import {Achievements} from "../entity/Achievements";

export type RelatedItems = Routes | Reviews | Achievements;
export type RatingNumbers = 1 | 2 | 3 | 4 | 5;

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

// export interface RouteInput {
//
// };
//

export interface ReviewInput {
    title: string;
    description: string;
    rating: RatingNumbers;
}
//
// export interface UserLocationDataInput {
//
// };
//
// export interface CityMapInput {
//
// };
//
// export interface UserAchievementsInput {
//
// };
//
// export interface AchievementsInput {
//
// }
//
