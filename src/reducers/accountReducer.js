import { SET_AUTH_USER } from '../constants/account/accountReducerTypes';

const initialState = {
  token: 0,
  userId: 0,
  type: "",
  name: "",
  profilePhotoUrl: "",
  firstimeLogin: true,
  authenticated: false,
  profileCompleted: false,
}

export default function(state=initialState, action) {
  switch(action.type) {
    case SET_AUTH_USER:
      return { ...state, ...action.data };
    default:
      return state;
  }
}
