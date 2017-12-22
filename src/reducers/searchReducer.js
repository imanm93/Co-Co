import { SET_DASH_SEARCH_QUERY } from '../constants/search/searchReducerTypes';

const initialState = {
  dashquery: ''
}

export default function(state=initialState, action) {
  switch(action.type) {
    case SET_DASH_SEARCH_QUERY:
      return { ...state, ...{ dashquery: 'query=' + action.query } };
    default:
      return state;
  }
}
