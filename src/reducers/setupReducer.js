import { SET_COURSES, SET_YEARS, SET_SIGN_UP_SOURCES, SET_SIGN_UP_REASONS } from '../constants/setup/setupReducerTypes';

const initialState = {
  signUpSources: [],
  signUpReasons: [],
  courses: [],
  years: []
}

export default function(state=initialState, action) {
  switch(action.type) {
    case SET_YEARS:
      return { ...state, ...{ years: action.data } };
    case SET_COURSES:
      return { ...state, ...{ courses: action.data } };
    case SET_SIGN_UP_SOURCES:
      return { ...state, ...{ signUpSources: action.data } };
    case SET_SIGN_UP_REASONS:
      return { ...state, ...{ signUpReasons: action.data } };      
    default:
      return state;
  }
}
