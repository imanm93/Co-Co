
let url = 'https://coandcotest.azurewebsites.net';

if (process.env.NODE_ENV === "production") {
    url = 'http://coandcoapi.azurewebsites.net'
}

export const ROOT_URL = url;
