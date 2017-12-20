import { FETCH_TOPICS, FETCH_OPP_TYPES, FETCH_PEOPLE_TYPES, FETCH_EVENT_TYPES } from '../constants/filters/filtersFetchTypes';

export const fetchTopics = () => ({
  type: FETCH_TOPICS
});

export const fetchOppTypes = () => ({
  type: FETCH_OPP_TYPES
});

export const fetchPeopleTypes = () => ({
  type: FETCH_PEOPLE_TYPES
});

export const fetchEventTypes = () => ({
  type: FETCH_EVENT_TYPES
});
