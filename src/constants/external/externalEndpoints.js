
let ROOT_URL = 'http://localhost:5000';

if (process.env.NODE_ENV === "production") {
    ROOT_URL = 'http://coandcoapi.azurewebsites.net'
}

export const POST_EXTERNAL_URL = `${ROOT_URL}/ExternalCompanies`;

export const GET_EXTERNAL_COMPANY_URL = `${ROOT_URL}/ExternalCompanies/email`;

export const GET_EXTERNAL_VERIFY_URL = `${ROOT_URL}/Verify`;
