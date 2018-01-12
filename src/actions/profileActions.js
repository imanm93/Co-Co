
import axios from '../utils/axios';
import { SET_API_ERROR } from '../constants/api/apiErrorTypes';
import { POST_LOGOUT_URL } from '../constants/account/accountEndpoints';
import { UNSET_AUTH_USER } from '../constants/account/accountReducerTypes';
import { FETCH_PROFILE_DATA } from '../constants/profiles/profileFetchTypes';
import { SET_PROFILE_VIEW_ID } from '../constants/profiles/profileReducerTypes';
import { GET_CONNECTION_REQUESTS_URL } from '../constants/connections/connectionEndpoints';
import { PUT_USER_SKILLS_URL, PUT_USER_TOPICS_URL } from '../constants/profiles/profileEndpoints';
import { SET_REQUESTED_CONNECTION, UNSET_REQUESTED_CONNECTION } from '../constants/connections/connectionReducerTypes';

export const fetchProfileData = (token, userId) => ({
  type: FETCH_PROFILE_DATA,
  userId: userId,
  token: token,
  my: false
});

export const fetchMyProfile = (token, userId) => ({
  type: FETCH_PROFILE_DATA,
  userId: userId,
  token: token,
  my: true
});

export function setProfileViewId(userId, history) {
  return function (dispatch) {
    dispatch({
      type: SET_PROFILE_VIEW_ID,
      data: userId
    })
    history.push('/profile/view');
  }
}

export function setUserTopics(token, topics, callback) {
  return function(dispatch) {
    axios({
      method: 'PUT',
      url: PUT_USER_TOPICS_URL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: {
        'topicIds': topics
      }
    })
    .then(res => {
      callback(1)
    })
    .catch(err => {
      /* Set some error and show on container */
    })
  }
}

export function setUserSkills(token, skills, callback) {
  return function(dispatch) {
    axios({
      method: 'PUT',
      url: PUT_USER_SKILLS_URL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: {
        'skillIds': skills
      }
    })
    .then(res => {
      callback(1)
    })
    .catch(err => {
      /* Set some error and show on container */
    })
  }
}

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

export function signOutUser(token, userId, ctx) {
  return function(dispatch) {
    dispatch({
      type: UNSET_AUTH_USER
    });
    ctx.push('/');
    // axios({
    //   method: 'POST',
    //   url: POST_LOGOUT_URL,
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer ' + token
    //   }
    // })
    // .then(res => {
    //   dispatch({
    //     type: UNSET_AUTH_USER
    //   });
    //   ctx.push('/');
    // })
    // .catch(err => {
    //   dispatch({
    //     type: SET_API_ERROR,
    //     error: err.response ? err.response.data : 'There was a network error, please try again!'
    //   });
    // })
  }
}
