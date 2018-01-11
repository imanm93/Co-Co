import { SET_NOTIFICATIONS } from '../constants/notifications/notificationReducerTypes';

const initialState = {
  notifications: []
}

export default function(state=initialState, action) {
  switch(action.type) {
    case SET_NOTIFICATIONS:
      return { ...state, ...{ notifications: action.data } };
    default:
      return state;
  }
}
