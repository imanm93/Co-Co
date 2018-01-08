
// let ROOT_URL = 'http://localhost:5000';

let url = 'http://coandcoapi.azurewebsites.net';

// let url = "http://coandcotestprod.azurewebsites.net";

if (process.env.NODE_ENV === "production") {
    url = 'http://coandcoapi.azurewebsites.net'
}

export const ROOT_URL = url;
