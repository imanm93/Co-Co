let ROOT_URL = 'http://localhost:5000';

if (process.env.NODE_ENV === "production") {
    ROOT_URL = 'http://coandcoapi.azurewebsites.net';
}

export const GET_FILTERED_ITEMS = `${ROOT_URL}/Dashboard`;
export const GET_ITEMS_BY_ID =  `${ROOT_URL}/Dashboard/`;
export const GET_ITEM_COMMENT = `${ROOT_URL}/Comments`;
export const GET_ITEM_LIKES = `${ROOT_URL}/Likes/v2`;

export * from './statusitems/statusitemEndpoints';
export * from './eventitems/eventitemEndpoints';
export * from './oppitems/oppitemEndpoints';
