let ROOT_URL = 'http://localhost:5000';

if (process.env.NODE_ENV === "production") {
    ROOT_URL = 'http://coandcoapi.azurewebsites.net'
}

export const GET_FILTERED_OPP_ITEMS = `${ROOT_URL}/Opportunities`;

export const GET_EXPANDED_OPP_ITEM = `${ROOT_URL}/Opportunities`;
