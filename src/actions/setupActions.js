import { FETCH_COURSES, FETCH_YEARS, FETCH_SIGN_UP_SOURCES, FETCH_SIGN_UP_REASONS } from '../constants/setup/setupFetchTypes';

export const fetchCourses = (token) => ({
  type: FETCH_COURSES,
  token: token
});

export const fetchYears = (token) => ({
  type: FETCH_YEARS,
  token: token
});

export const fetchSignUpSources = (token) => ({
  type: FETCH_SIGN_UP_SOURCES,
  token: token
});

export const fetchSignUpReasons = (token) => ({
  type: FETCH_SIGN_UP_REASONS,
  token: token
});
