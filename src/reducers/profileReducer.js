import { SET_PROFILE_VIEW_ID, SET_PROFILE_VIEW_DATA } from '../constants/profiles/profileReducerTypes';

const initialState = {
  profileViewId: '',
  profileViewData: {}
}

export default function(state=initialState, action) {
  switch(action.type) {
    case SET_PROFILE_VIEW_ID:
      return { ...state, ...{ profileViewId: action.data } };
    case SET_PROFILE_VIEW_DATA:
      return { ...state, ...{ profileViewData: action.data } };
    default:
      return state;
  }
}
