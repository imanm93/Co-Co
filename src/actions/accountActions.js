/**
 * User Account Actions
 * @desc All actions associated with the user's account
 */
import qs from 'qs';
import axios from '../utils/axios';
import jwt_decode from 'jwt-decode';

import { SET_API_ERROR } from '../constants/api/apiErrorTypes';
import { IS_SETTING_UP } from '../constants/setup/setupLoaderTypes';
import { SET_AUTH_USER } from '../constants/account/accountReducerTypes';
import { SET_FORGOT_PASSWORD_EMAIL_SENT_SUCCESSFULL } from '../constants/account/accountSuccessTypes';
import { IS_AUTHENTICATING, IS_SIGNING_UP, IS_SENDING_FORGOT_PASSWORD } from '../constants/account/accountLoaderTypes';
import { SET_SIGN_IN_ERROR, SET_SIGN_UP_ERROR, SET_FORGOT_PASSWORD_ERROR } from '../constants/account/accountErrorTypes';
import { GET_AUTH_URL, GET_USER_URL, POST_SIGNUP_URL, GET_RESEND_URL, POST_SETUP_URL, POST_FORGOT_PASSWORD_URL } from '../constants/account/accountEndpoints';
import { SET_EMAIL_SENT_SUCCESSFULL, SET_VERIFY_USER_ID, IS_RESENDING_EMAIL, SET_EMAIL_SENT_ERROR, SET_SETUP_ERROR } from '../constants/verify/verifyReducerTypes';

/**
 * Get authentication token for user
 * @param { email, password }
 */
export function postSignInUser(details, callback) {
  return function (dispatch) {
    dispatch({ type: IS_AUTHENTICATING, data: true });
    axios.post(GET_AUTH_URL, qs.stringify({
      username: details.email,
      password: details.password,
      "grant_type": "password",
      scope: "openid"
    }))
      .then(response => {
        let token = response.data.access_token;
        let decoded = jwt_decode(response.data.id_token);
        let userId = decoded.sub;
        dispatch({
          type: SET_AUTH_USER,
          data: {
            token: token,
            userId: userId,
            authenticated: true
          }
        });
        axios.defaults.headers = Object.assign({}, axios.defaults.headers,
          { 'Authorization': `Bearer ${response.data.access_token}` }
        );
        callback();
      })
      .catch(err => {
        dispatch({
          type: SET_SIGN_IN_ERROR,
          data: {
            error: true,
            errorMessage: err.response ? err.response.data : "Couldn't validate your account"
          }
        });
        dispatch({ type: SET_API_ERROR, data: err });
        dispatch({ type: IS_AUTHENTICATING, data: false });
      });
  }
}

/**
 * Get logged in user information
 * @param userId
 */
export function getUserInfo(token, callback) {
  return function (dispatch) {
    dispatch({ type: IS_AUTHENTICATING, data: true });
    axios({
      method: 'GET',
      url: GET_USER_URL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => {
        dispatch({
          type: SET_AUTH_USER,
          data: response.data
        });
        dispatch({ type: IS_AUTHENTICATING, data: false });
        callback(response);
      })
      .catch(err => {
        dispatch({
          type: SET_SIGN_IN_ERROR,
          error: true,
          errorMessage: err.response ? err.response.data : "Couldn't validate your account"
        });
        dispatch({ type: SET_API_ERROR, data: err });
        dispatch({ type: IS_AUTHENTICATING, data: false });
      });
  }
}

/**
 * Sign up new user
 * @param { ...userDetails }
 * @param userType
 * @param redirect f()
 */
export function signUpUser(values, userType, ctx) {
  return function (dispatch) {
    dispatch({ type: IS_SIGNING_UP, data: true });
    axios({
      method: 'POST',
      url: POST_SIGNUP_URL + '?userType=' + userType,
      data: values
    })
      .then(res => {
        dispatch({
          type: SET_VERIFY_USER_ID,
          data: res.data
        });
        dispatch({ type: IS_SIGNING_UP, data: false });
        ctx.history.push('/verify');
      })
      .catch(err => {
        dispatch({ type: SET_SIGN_UP_ERROR, error: err.response.data ? err.response.data : "We're sorry something went wrong, please try again!" });
        dispatch({ type: IS_SIGNING_UP, data: false });
      });
  }
}

/**
 * Resend verification email
 * @param userId
 */
export function resendVerificationEmail(userId) {
  return function (dispatch) {
    dispatch({
      type: IS_RESENDING_EMAIL,
      data: true
    });
    axios({
      method: 'GET',
      url: GET_RESEND_URL + '?UserId=' + userId
    })
      .then(response => {
        setTimeout(() => {
          dispatch({
            type: SET_EMAIL_SENT_SUCCESSFULL
          });
        }, 1000);
        dispatch({
          type: IS_RESENDING_EMAIL,
          data: false
        });
      })
      .catch(err => {
        dispatch({
          type: SET_EMAIL_SENT_ERROR,
          error: err.response ? 'Could not be sent, please try again' : ''
        })
        dispatch({
          type: IS_RESENDING_EMAIL,
          data: false
        });
      });
  }
}

export function setupUser(token, values, callback) {
  return function (dispatch) {
    dispatch({
      type: IS_SETTING_UP,
      data: true
    });
    axios({
      method: 'POST',
      url: POST_SETUP_URL,
      data: values,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(resp => {
        console.log(resp);
        dispatch({
          type: IS_SETTING_UP,
          data: false
        })
        callback(resp);
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: SET_API_ERROR,
          error: err
        });
        dispatch({
          type: SET_SETUP_ERROR,
          error: err.response
        });

        dispatch({
          type: IS_SETTING_UP,
          data: false
        })
      })
  }
}


/**
 * Get logged in user information
 * @param email
 */
export function forgotPassword(email) {
  return function (dispatch) {
    let type = IS_SENDING_FORGOT_PASSWORD;
    dispatch({ type: type, data: true });
    axios.post(POST_FORGOT_PASSWORD_URL + `?email=${email.email}`)
      .then(res => {
        dispatch({ type: type, data: false });
        dispatch({
          type: SET_FORGOT_PASSWORD_ERROR, error: null
        });
        dispatch({ type: SET_FORGOT_PASSWORD_EMAIL_SENT_SUCCESSFULL, data: res })
      })
      .catch(err => {
        dispatch({
          type: SET_FORGOT_PASSWORD_ERROR,
          error: err.response.data
        });
        dispatch({ type: type, data: false });
      });
  }
}