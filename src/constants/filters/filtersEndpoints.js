
let ROOT_URL = 'http://localhost:5000';

if (process.env.NODE_ENV === "production") {
    ROOT_URL = 'http://coandcoapi.azurewebsites.net'
}

export const GET_TOPICS_URL = `${ROOT_URL}/Topics`;

export const GET_OPP_TYPES_URL = `${ROOT_URL}/Opportunities/Types`;

export const GET_EVENT_TYPES_URL = `${ROOT_URL}/Events/Types`;

export const GET_PEOPLE_TYPES_URL = `${ROOT_URL}`;
