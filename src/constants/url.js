
// let ROOT_URL = 'http://localhost:5000';

let url = "https://coandcotestprod.azurewebsites.net";

if (process.env.NODE_ENV === "production") {
    url = 'http://coandcoapi.azurewebsites.net'
}

export const ROOT_URL = url;
