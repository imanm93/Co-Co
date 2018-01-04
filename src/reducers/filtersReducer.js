import { SET_OPP_TYPES, SET_TOPICS, SET_EVENT_TYPES, SET_DISCIPLINES } from '../constants/filters/filtersReducerTypes';

const initialState = {
  oppTypes: {},
  topicTypes: {},
  eventTypes: {},
  peopleTypes: {},
  disciplineTypes: {}
}

export default function(state=initialState, action) {
  switch(action.type) {
      case SET_TOPICS:
          return { ...state, ...{ topicTypes: action.data } };
      case SET_OPP_TYPES:
          return { ...state, ...{ oppTypes: action.data } };
      case SET_EVENT_TYPES:
          return { ...state, ...{ eventTypes: action.data } };
      case SET_DISCIPLINES:
          return { ...state, ...{ disciplineTypes: action.data } };
      default:
          return state;
  }
}
