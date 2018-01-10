import { SET_IS_VERIFIED, SET_COMPANY_EMAIL, SET_COMPANY_DETAILS, SET_COMPANY_ERROR, SET_COMPANY_VERIFY_ERROR } from '../constants/external/externalReducerTypes';

const initialState = {
  externalEmail: '',
  isVerified: false,
  externalDetails: {},
  externalVerifyFError: '',
  externalFormError: ''
}

export default function (state=initialState, action) {
  switch(action.type) {
    case SET_IS_VERIFIED:
      return { ...state, ...{ isVerified: action.data } };
    case SET_COMPANY_EMAIL:
      return { ...state, ...{ externalEmail: action.data } };
    case SET_COMPANY_DETAILS:
      return { ...state, ...{ externalDetails: action.data } };
    case SET_COMPANY_ERROR:
      return { ...state, ...{ externalFormError: action.error } };
    case SET_COMPANY_VERIFY_ERROR:
      return { ...state, ...{ externalVerifyFError: action.error } };
    default:
      return state;
  }
}
