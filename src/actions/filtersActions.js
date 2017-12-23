import { FETCH_TOPICS, FETCH_OPP_TYPES, FETCH_PEOPLE_TYPES, FETCH_EVENT_TYPES } from '../constants/filters/filtersFetchTypes';
import { SET_DASH_FILTER_QUERY } from '../constants/filters/filtersReducerTypes';

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

export function setFilterQuery(query) {
  return function(dispatch) {
    dispatch({
      type: SET_DASH_FILTER_QUERY,
      query: query
    });
  }
}
