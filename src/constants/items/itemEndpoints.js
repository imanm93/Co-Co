let ROOT_URL = 'http://localhost:5000';

if (process.env.NODE_ENV === "production") {
    ROOT_URL = 'http://coandcoapi.azurewebsites.net';
}

export const GET_FILTERED_ITEMS_URL = `${ROOT_URL}/Dashboard`;
export const GET_ITEMS_BY_ID_URL =  `${ROOT_URL}/Dashboard/`;
export const GET_ITEM_COMMENT_URL = `${ROOT_URL}/Comments`;
export const GET_ITEM_LIKES_URL = `${ROOT_URL}/Likes/v2`;

export * from './statusitems/statusitemEndpoints';
export * from './eventitems/eventitemEndpoints';
export * from './oppitems/oppitemEndpoints';
