import { SET_SKILLS } from '../constants/skills/skillsReducerTypes';

const initialState = {
  skills: {}
};

export default function(state=initialState, action) {
  switch(action.type) {
    case SET_SKILLS:
      return { ...state, ...{ skills: action.data } };
    default:
      return state;
  }
}
