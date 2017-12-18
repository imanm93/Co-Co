import { SET_API_ERROR } from '../constants/api/apiErrorTypes';

const initialState = {
  err: {}
}

export default function(state=initialState, action) {
  switch(action.type) {
    case SET_API_ERROR:
      return { ...state, ...{ err: action.data } };
    default:
      return state;
  }
}
