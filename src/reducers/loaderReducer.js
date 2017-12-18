import { IS_AUTHENTICATING } from '../constants/account/accountLoaderTypes';

const initialState = {}

export default function(state=initialState, action) {
  switch (action.type) {
    case IS_AUTHENTICATING:
      return { ...state, ...{ isAuthenticating: action.data } };
    default:
      return state;
  }
}
