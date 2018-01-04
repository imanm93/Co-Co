import { SET_SKILLS, SET_STREAMS } from '../constants/skills/skillsReducerTypes';

const initialState = {
  skills: {},
  streams: {}
};

export default function(state=initialState, action) {
  switch(action.type) {
    case SET_SKILLS:
      return { ...state, ...{ skills: action.data } };
    case SET_STREAMS:
      return { ...state, ...{ streams: action.data } };
    default:
      return state;
  }
}
