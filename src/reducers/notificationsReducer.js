import { SET_NOTIFICATIONS } from '../constants/notifications/notificationReducerTypes';

const initialState = {
  dashItemNotifications: [],
  commentsOwnNotifications: [],
  commentsOtherNotifications: []
}

export default function(state=initialState, action) {
  switch(action.type) {
    case SET_NOTIFICATIONS:
      return { ...state, ...{ dashItemNotifications: action.data.items } };
    default:
      return state;
  }
}
