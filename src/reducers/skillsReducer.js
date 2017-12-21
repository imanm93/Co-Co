import { SET_SKILLS } from '../constants/skills/skillsReducerTypes';

const initialState = {
  skills: {}
};

export default function(state=initialState, action) {
  switch(action.type) {
    case SET_SKILLS:
      console.log(action.data);
      break;
    default:
      return state;
  }
}
