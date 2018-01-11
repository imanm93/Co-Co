import axios from '../utils/axios';
import { SET_API_ERROR } from '../constants/api/apiErrorTypes';
import { FETCH_NOTIFICATIONS } from '../constants/notifications/notificationFetchTypes';
import { FETCH_CONNETION_REQUESTS } from '../constants/connections/connectionFetchTypes';
import { GET_CONNECTION_REQUESTS_URL } from '../constants/connections/connectionEndpoints';
import { SET_CONNECTION_REQUEST_STATUS } from '../constants/connections/connectionReducerTypes';

export const fetchNotifications = (token) => ({
    type: FETCH_NOTIFICATIONS,
    token: token
})

export const fetchConnectionRequests = (token) => ({
  type: FETCH_CONNETION_REQUESTS,
  token: token
})

export function postAcceptConnection(token, userId) {
  return function(dispatch) {
    dispatch({
      type: SET_CONNECTION_REQUEST_STATUS,
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
        type: SET_API_ERROR,
        error: err.resonse ? err.response : 'There was an error, please try again!'
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
        type: SET_API_ERROR,
        error: err.resonse ? err.response : 'There was an error, please try again!'
      });
    })
  }
}
