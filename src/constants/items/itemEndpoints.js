import { ROOT_URL } from '../url.js';

export const GET_FILTERED_ITEMS_URL = `${ROOT_URL}/Dashboard`;

export const GET_ITEMS_BY_ID_URL =  `${ROOT_URL}/Dashboard/`;

export const GET_ITEM_COMMENT_URL = `${ROOT_URL}/Comments`;

export const GET_ITEM_LIKES_URL = `${ROOT_URL}/Likes`;

export const GET_FILTERED_PEOPLE_ITEMS_URL = `${ROOT_URL}/Users`;

export const PUT_DASHBOARD_ITEMS_SEEN = `${ROOT_URL}/Dashboard/Seen`;

export const GET_ITEMS_BY_IDS = `${ROOT_URL}/Dashboard/details`;

export * from './statusitems/statusitemEndpoints';
export * from './eventitems/eventitemEndpoints';
export * from './oppitems/oppitemEndpoints';
