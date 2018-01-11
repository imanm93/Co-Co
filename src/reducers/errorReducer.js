//import { SET_POST_ITEM_ERROR } from '../constants/items/itemErrorTypes';
// case SET_POST_ITEM_ERROR:
//   return { ...state, ...{ postItemError: action.error } };

import { SET_SIGN_IN_ERROR, SET_SIGN_UP_ERROR } from '../constants/account/accountErrorTypes';
import { SET_SAVE_PROFILE_ERROR, SET_LOAD_PROFILE_ERROR } from '../constants/profiles/profileErrorTypes';

const initialState = {
  apiError: {},
  setupError: {},
  signInError: '',
  signUpError: '',
  postItemError: '',
  loadProfileError: '',
  saveProfileError: ''
}

export default function(state=initialState, action) {
  switch(action.type) {
    case SET_SIGN_IN_ERROR:
      return { ...state, ...{ signInError: action.data } };
    case SET_SIGN_UP_ERROR:
      return { ...state, ...{ signUpError: action.error } };
    case SET_LOAD_PROFILE_ERROR:
      return { ...state, ...{ loadProfileError: action.error } };
    case SET_SAVE_PROFILE_ERROR:
      return { ...state, ...{ saveProfileError: action.error } };
    default:
      return state;
  }
}
