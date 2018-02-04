import { SET_PROFILE_VIEW_ID, SET_PROFILE_VIEW_DATA, SET_MY_PROFILE_DATA, SET_CONNECTIONS_STATUS_PRFOFILE, UNSET_CONNECTIONS_STATUS_PRFOFILE } from '../constants/profiles/profileReducerTypes';

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
      return { ...state, ...{ profileEditData: action.data } };
    case SET_CONNECTIONS_STATUS_PRFOFILE:
      let profileSetConnectionStatus = Object.assign({}, state.profileViewData);
      profileSetConnectionStatus['connectionStatus'] = 'requestedTo';
      return { ...state, ...{ profileViewData: profileSetConnectionStatus } };
    case UNSET_CONNECTIONS_STATUS_PRFOFILE:
      let profileUnsetConnectionStatus = Object.assign({}, state.profileViewData);
      profileUnsetConnectionStatus['connectionStatus'] = '';
      return { ...state, ...{ profileViewData: profileUnsetConnectionStatus } };
    default:
      return state;
  }
}
