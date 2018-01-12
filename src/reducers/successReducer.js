import { SET_FORGOT_PASSWORD_EMAIL_SENT_SUCCESSFULL } from '../constants/account/accountSuccessTypes';

const initialState = { 
  forgotPasswordSuccess : false,
}

export default function(state=initialState, action) {
  switch(action.type) { 
    case SET_FORGOT_PASSWORD_EMAIL_SENT_SUCCESSFULL:
        return { ...state, ...{ forgotPasswordSuccess: action.data} }; 
    default:
      return state;
  }
}
