import { FETCH_NOTIFICATIONS } from '../constants/notifications/notificationFetchTypes';
import { FETCH_CONNETION_REQUESTS } from '../constants/connections/connectionFetchTypes';

export const fetchNotifications = (token) => ({
    type: FETCH_NOTIFICATIONS,
    token: token
})

export const fetchConnectionRequests = (token) => ({
  type: FETCH_CONNETION_REQUESTS,
  token: token
})
