let ROOT_URL = 'http://localhost:5000';

if (process.env.NODE_ENV === "production") {
    ROOT_URL = 'http://coandcoapi.azurewebsites.net'
}

export const GET_FILTERED_OPP_ITEMS_URL = `${ROOT_URL}/Opportunities`;

export const GET_EXPANDED_OPP_ITEM_URL = `${ROOT_URL}/Opportunities`;

export const POST_OPPS_EXTERNAL_URL = `${ROOT_URL}/Opportunities/external`;
