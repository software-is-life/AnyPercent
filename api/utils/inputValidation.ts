
/*
* Input validation taken from Angular.js libary. source: https://github.com/angular/angular.js/blob/65f800e19ec669ab7d5abbd2f6b82bf60110651a/src/ng/directive/input.js#L25C2-L27C209
* */
const URL_REGEXP = /^[a-z][a-z\d.+-]*:\/*(?:[^:@]+(?::[^@]+)?@)?(?:[^\s:/?#]+|\[[a-f\d:]+])(?::\d+)?(?:\/[^?#]*)?(?:\?[^#]*)?(?:#.*)?$/i;
const EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;

export const validateEmail = (potentialEmail: string): boolean => EMAIL_REGEXP.test(potentialEmail);
export const validateURL = (potentialURL: string): boolean => URL_REGEXP.test(potentialURL);

// TODO: integrate google address validation api: https://cloud.google.com/nodejs/docs/reference/addressvalidation/latest
// TODO: might make more sense to do address validation on front-end side first
export const validateAddress = () => {};

export const validatePhoneNumber = () => {};

export const validateRetrievingLocations = (data: any): boolean => data.longitude && data.latitude || data.cityRegionId || data.name;