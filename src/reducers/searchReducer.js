import { SET_DASH_SEARCH_QUERY } from '../constants/search/searchReducerTypes';

const initialState = {
  dashsearch: ''
}

export default function(state=initialState, action) {
  switch(action.type) {
    case SET_DASH_SEARCH_QUERY:
      return { ...state, ...{ dashsearch: action.query } };
    default:
      return state;
  }
}
