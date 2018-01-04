import { SET_VERIFY, CLEAR_VERIFY, SET_VERIFY_USER_ID, SET_EMAIL_SENT_SUCCESSFULL, SET_EMAIL_SENT_ERROR, IS_RESENDING_EMAIL } from '../constants/verify/verifyReducerTypes';

const initialState = {
  email: '',
  userId: '',
  message: '',
  emailError: '',
  emailSent: false,
  redicertToUrl: '',
  isResendingEmail: false
}

export default function (state=initialState, action) {
  switch(action.type) {
    case SET_VERIFY:
      return { ...state, ...action.data };
    case CLEAR_VERIFY:
      return { ...state, ...{ initialState } };
    case SET_VERIFY_USER_ID:
      return { ...state, ...{ userId: action.data } };
    case IS_RESENDING_EMAIL:
      return { ...state, ...{ isResendingEmail: action.data } };
    case SET_EMAIL_SENT_ERROR:
      return { ...state, ...{ emailError: action.error } };
    case SET_EMAIL_SENT_SUCCESSFULL:
      return { ...state, ...{ emailSent: true } };
    default:
      return state;
  }
}
