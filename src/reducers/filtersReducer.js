import { SET_OPP_TYPES, SET_TOPICS, SET_EVENT_TYPES, SET_PEOPLE_TYPES, SET_DASH_FILTER_QUERY } from '../constants/filters/filtersReducerTypes';

const initialState = {
  oppTypes: {},
  eventTypes: {},
  peopleTypes: {},
  topicTypes: {},
  dashquery: ''
}

export default function(state=initialState, action) {
  switch(action.type) {
      case SET_TOPICS:
          return { ...state, ...{ topicTypes: action.data } };
      case SET_OPP_TYPES:
          return { ...state, ...{ oppTypes: action.data } };
      case SET_EVENT_TYPES:
          return { ...state, ...{ eventTypes: action.data } };
      case SET_PEOPLE_TYPES:
          return { ...state, ...{ peopleTypes: action.data } };
      case SET_DASH_FILTER_QUERY:
          return { ...state, ...{ dashquery: action.query } };
      default:
          return state;
  }
}
