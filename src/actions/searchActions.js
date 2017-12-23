import { FETCH_SKILLS } from '../constants/skills/skillsFetchTypes';
import { SET_DASH_SEARCH_QUERY } from '../constants/search/searchReducerTypes';

export const fetchSkills = () => ({
  type: FETCH_SKILLS
});

export function setSearchQuery(query) {
  return function (dispatch) {
    dispatch({
      type: SET_DASH_SEARCH_QUERY,
      query: query
    });
  }
}
