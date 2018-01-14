import { SET_AUTH_USER, UNSET_AUTH_USER } from '../constants/account/accountReducerTypes';

const initialState = {
  token: 0,
  userId: 0,
  type: "",
  name: "",
  profilePhotoUrl: "",
  firstimeLogin: true,
  authenticated: false,
  profileComplete: false,
  lastActivityTimestamp: ''
}

export default function(state=initialState, action) {
  switch(action.type) {
    case SET_AUTH_USER:
      return { ...state, ...action.data };
    case UNSET_AUTH_USER:
      return { ...state, ...initialState }; 
    default:
      return state;
  }
}
