
let ROOT_URL = 'http://localhost:5000';

if (process.env.NODE_ENV === "production") {
    ROOT_URL = 'http://coandcoapi.azurewebsites.net'
}

export const GET_AUTH_URL = `${ROOT_URL}/Account/Login`;

export const GET_USER_URL = `${ROOT_URL}/Account/UserInfo`
