let ROOT_URL = 'http://localhost:5000';

if (process.env.NODE_ENV === "production") {
    ROOT_URL = 'http://coandcoapi.azurewebsites.net'
}

export const GET_SIGN_UP_SOURCES_URL = `${ROOT_URL}/SignUpSources`;

export const GET_SIGN_UP_REASONS_URL = `${ROOT_URL}/SignUpReasons`;

export const GET_YEARS_URL = `${ROOT_URL}/GraduationYears`;

export const GET_COURSES_URL = `${ROOT_URL}/Courses`;
