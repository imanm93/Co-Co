import { FETCH_TOPICS, FETCH_OPP_TYPES, FETCH_PEOPLE_TYPES, FETCH_EVENT_TYPES } from '../constants/filters/filtersFetchTypes';

export const fetchTopics = (token) => ({
  type: FETCH_TOPICS,
  token: token
});

export const fetchOppTypes = (token) => ({
  type: FETCH_OPP_TYPES,
  token: token
});

export const fetchPeopleTypes = (token) => ({
  type: FETCH_PEOPLE_TYPES,
  token: token
});

export const fetchEventTypes = (token) => ({
  type: FETCH_EVENT_TYPES,
  token: token
});
