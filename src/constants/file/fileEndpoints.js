let ROOT_URL = 'http://localhost:5000';

if (process.env.NODE_ENV === "production") {
    ROOT_URL = 'http://coandcoapi.azurewebsites.net';
}

export const FILE_UPLOAD_URL = `${ROOT_URL}/ImageUpload`;
