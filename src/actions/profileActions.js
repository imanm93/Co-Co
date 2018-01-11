
import axios from '../utils/axios';
import { SET_API_ERROR } from '../constants/api/apiErrorTypes';
import { FETCH_PROFILE_DATA } from '../constants/profiles/profileFetchTypes';
import { SET_PROFILE_VIEW_ID } from '../constants/profiles/profileReducerTypes';
import { GET_CONNECTION_REQUESTS_URL } from '../constants/connections/connectionEndpoints';
import { SET_REQUESTED_CONNECTION, UNSET_REQUESTED_CONNECTION } from '../constants/connections/connectionReducerTypes';

export function setProfileViewId(userId, history) {
  return function (dispatch) {
    dispatch({
      type: SET_PROFILE_VIEW_ID,
      data: userId
    })
    history.push('/profile/view');
  }
}

export const fetchProfileData = (token, userId) => ({
  type: FETCH_PROFILE_DATA,
  userId: userId,
  token: token
});

/* To be in one component */
export function postConnectFromProfile(token, userId) {
  return function (dispatch) {
    dispatch({
      type: SET_REQUESTED_CONNECTION,
      id: userId
    });
    axios({
      method: 'POST',
      url: GET_CONNECTION_REQUESTS_URL + '/' + userId,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    })
    .then(res => {
      console.log(res);
      /* Do nothing */
    })
    .catch(err => {
      dispatch({
        type: UNSET_REQUESTED_CONNECTION,
        id: userId
      });
      dispatch({
        type: SET_API_ERROR,
        error: err.response ? err.response.data : 'Network error, please try again!'
      });
    })
  }
}
