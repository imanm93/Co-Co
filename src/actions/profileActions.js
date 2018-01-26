import axios from '../utils/axios';

import { SET_API_ERROR } from '../constants/api/apiErrorTypes';
import { GET_PROFILE } from '../constants/profiles/profileEndpoints';
import { POST_LOGOUT_URL } from '../constants/account/accountEndpoints';
import { UNSET_AUTH_USER, SET_PROFILE_COMPLETE } from '../constants/account/accountReducerTypes';
import { FETCH_PROFILE_DATA } from '../constants/profiles/profileFetchTypes';
import { IS_SAVING_PROFILE, IS_SAVING_SKILLS, IS_SAVING_TOPICS } from '../constants/profiles/profileLoaderTypes';
import { SET_PROFILE_VIEW_ID, SET_CONNECTIONS_STATUS_PRFOFILE, UNSET_CONNECTIONS_STATUS_PRFOFILE } from '../constants/profiles/profileReducerTypes';
import { SET_SAVE_PROFILE_ERROR } from '../constants/profiles/profileErrorTypes';
import { GET_CONNECTION_REQUESTS_URL } from '../constants/connections/connectionEndpoints';
import { PUT_USER_SKILLS_URL, PUT_USER_TOPICS_URL } from '../constants/profiles/profileEndpoints';
import { SET_REQUESTED_CONNECTION, UNSET_REQUESTED_CONNECTION } from '../constants/connections/connectionReducerTypes';
import { SET_LAST_ACTIVITY_TIMESTAMP } from '../constants/account/accountReducerTypes';

export const fetchProfileData = (token, userId) => ({
  type: FETCH_PROFILE_DATA,
  userId: userId,
  token: token,
  my: false
});

export const fetchMyProfile = (token, userId) => {
  return ({
    type: FETCH_PROFILE_DATA,
    userId: userId,
    token: token,
    my: true
  });
}

export function setProfileViewId(token, userId, ctx) {
  return function (dispatch) {
    dispatch({
      type: SET_PROFILE_VIEW_ID,
      data: userId
    });
    if (!ctx.history) ctx.push('/profile/view');
    if (ctx.history) ctx.history.push('/profile/view');
  }
}

export function setUserTopics(token, topics, callback) {
  return function(dispatch) {
    dispatch({
      type: IS_SAVING_TOPICS,
      data: true
    });
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
      dispatch({
        type: IS_SAVING_TOPICS,
        data: false
      });
    })
    .catch(err => {
      /* Set some error and show on container */
      dispatch({
        type: SET_API_ERROR,
        error: err
      });
      dispatch({
        type: IS_SAVING_TOPICS,
        data: false
      });
    })
  }
}

export function putUserProfile(token, values, userId, ctx) {
  return function (dispatch) {
    dispatch({
      type: IS_SAVING_PROFILE,
      data: true
    });
    dispatch({
      type: SET_LAST_ACTIVITY_TIMESTAMP,
      data: new Date().getTime()
    });
    axios({
      method: 'PUT',
      url: GET_PROFILE,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: values
    })
    .then(res => {
      dispatch({
        type: IS_SAVING_PROFILE,
        data: false
      });
      dispatch({
        type: SET_PROFILE_VIEW_ID,
        data: ''
      });
      dispatch({
        type: SET_PROFILE_VIEW_ID,
        data: userId
      });
      dispatch({
        type:SET_PROFILE_COMPLETE
      })
      ctx.push('/profile/view');
    })
    .catch(err => {
      dispatch({
        type: IS_SAVING_PROFILE,
        data: false
      });
      dispatch({
        type: SET_SAVE_PROFILE_ERROR,
        error: 'There was a network error, please try again.'
      });
      dispatch({
        type: SET_API_ERROR,
        error: err
      });
    })
  }
}

export function setUserSkills(token, skills, callback) {
  return function(dispatch) {
    dispatch({
      type: IS_SAVING_SKILLS,
      data: true
    });
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
      dispatch({
        type: IS_SAVING_SKILLS,
        data: false
      });
    })
    .catch(err => {
      /* Set some error and show on container */
      dispatch({
        type: SET_API_ERROR,
        error: err
      });
      dispatch({
        type: IS_SAVING_SKILLS,
        data: false
      });
      callback(0);
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
    dispatch({
      type: SET_CONNECTIONS_STATUS_PRFOFILE,
      data: 'requestedTo'
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
      /* Do nothing */
    })
    .catch(err => {
      dispatch({
        type: UNSET_REQUESTED_CONNECTION,
        id: userId
      });
      dispatch({
        type: UNSET_CONNECTIONS_STATUS_PRFOFILE,
        data: 'requestedTo'
      });
      dispatch({
        type: SET_API_ERROR,
        error: err
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
