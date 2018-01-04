import { SET_API_ERROR, CLEAR_API_ERROR } from '../constants/api/apiErrorTypes';

const initialState = {
  err: {},
  message: ''
}

export default function(state=initialState, action) {
  switch(action.type) {
    case SET_API_ERROR:
      return { ...state, ...{ err: action.error, message: 'We are so sorry! There was an network issue, please try refreshing the page ...' } };
    case CLEAR_API_ERROR:
      return { ...state, ...{ initialState } };
    default:
      return state;
  }
}
