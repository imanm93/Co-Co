let ROOT_URL = 'http://localhost:5000';

if (process.env.NODE_ENV === "production") {
    ROOT_URL = 'http://coandcoapi.azurewebsites.net'
}

export const GET_FILTERED_EVENT_ITEMS_URL = `${ROOT_URL}/Events`;

export const GET_EXPANDED_EVENT_ITEM_URL = `${ROOT_URL}/Events`;
