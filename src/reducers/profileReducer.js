import { SET_PROFILE_VIEW_ID, SET_PROFILE_VIEW_DATA, SET_MY_PROFILE_DATA } from '../constants/profiles/profileReducerTypes';

const initialState = {
  profileViewId: '',
  profileViewData: {},
  profileEditData: {}
}

export default function(state=initialState, action) {
  switch(action.type) {
    case SET_PROFILE_VIEW_ID:
      return { ...state, ...{ profileViewId: action.data } };
    case SET_PROFILE_VIEW_DATA:
      return { ...state, ...{ profileViewData: action.data } };
    case SET_MY_PROFILE_DATA:
      console.log("getting my data");
      return { ...state, ...{ profileEditData: action.data } };
    default:
      return state;
  }
}
