import axios from '../utils/axios';
import { SET_API_ERROR } from '../constants/api/apiErrorTypes';
import { FETCH_CONNETION_REQUESTS } from '../constants/connections/connectionFetchTypes';
import { GET_CONNECTION_REQUESTS_URL } from '../constants/connections/connectionEndpoints';
import { SET_CONNECTION_REQUEST_STATUS } from '../constants/connections/connectionReducerTypes';
import { SET_NOTIFICATIONS_ERROR } from '../constants/connections/connectionErrorTypes';
import { FETCH_NOTIFICATIONS, FETCH_NOTIFICATION_ITEMS } from '../constants/notifications/notificationFetchTypes';
import { PUT_DASHBOARD_ITEMS_SEEN } from '../constants/items/itemEndpoints';
import { SET_PEOPLE_ITEM_CONNECTION_REQUEST_STATUS } from '../constants/items/peopleitems/peopleitemReducerTypes';

export const fetchNotifications = (token) => ({
    type: FETCH_NOTIFICATIONS,
    token: token
})

export const fetchConnectionRequests = (token) => ({
  type: FETCH_CONNETION_REQUESTS,
  token: token
})

export const fetchNotificationItems = (token, itemIds) => ({
  type: FETCH_NOTIFICATION_ITEMS,
  token: token,
  itemIds: itemIds
})

export function putDashboardItemSeen(token, itemIds) {
  return function(dispatch) {
      /* TODO: Make notification seen on notification reducer */
    axios({
      method: 'PUT',
      url: PUT_DASHBOARD_ITEMS_SEEN,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: {
        'itemIds': itemIds
      }
    })
    .then(res => {
      /* TODO: Revert seen */
      console.log(res);
    })
    .catch(err => {
      dispatch({
        type: SET_NOTIFICATIONS_ERROR,
        error: 'There was an error getting your notifications, please try again!'
      });
      dispatch({
        type: SET_API_ERROR,
        error: err
      });
    })
  }
}

export function postAcceptConnection(token, userId) {
  return function(dispatch) {
    dispatch({
      type: SET_CONNECTION_REQUEST_STATUS,
      userId: userId,
      status: 'accepted',
      error: ''
    });
    dispatch({
      type: SET_PEOPLE_ITEM_CONNECTION_REQUEST_STATUS,
      userId: userId,
      status: 'accepted',
      error: ''
    });
    axios({
      method: 'PUT',
      url: GET_CONNECTION_REQUESTS_URL + '/' + userId + '/accept',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    .then(res => {
      console.log(res.response);
      /* Do Nothing */
    })
    .catch(err => {
      dispatch({
        type: SET_CONNECTION_REQUEST_STATUS,
        userId: userId,
        status: 'default',
        error: 'There was a network issue, please try again!'
      });
      dispatch({
        type: SET_PEOPLE_ITEM_CONNECTION_REQUEST_STATUS,
        userId: userId,
        status: 'initial',
        error: 'There was a network issue, please try again!'
      });
      dispatch({
        type: SET_API_ERROR,
        error: err
      });
    })
  }
}

export function postRejectConnection(token, userId) {
  return function(dispatch) {
    dispatch({
      type: SET_CONNECTION_REQUEST_STATUS,
      userId: userId,
      status: 'rejected',
      error: ''
    });
    dispatch({
      type: SET_PEOPLE_ITEM_CONNECTION_REQUEST_STATUS,
      userId: userId,
      status: 'rejected',
      error: ''
    });
    axios({
      method: 'PUT',
      url: GET_CONNECTION_REQUESTS_URL + '/' + userId + '/decline',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    .then(res => {
      console.log(res.response);
      /* Do nothing */
    })
    .catch(err => {
      dispatch({
        type: SET_CONNECTION_REQUEST_STATUS,
        userId: userId,
        status: 'default',
        error: 'There was an error, please try again!'
      });
      dispatch({
        type: SET_PEOPLE_ITEM_CONNECTION_REQUEST_STATUS,
        userId: userId,
        status: 'initial',
        error: 'There was a network issue, please try again!'
      });
      dispatch({
        type: SET_API_ERROR,
        error: err
      });
    })
  }
}
