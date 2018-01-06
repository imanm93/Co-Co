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
import { IS_AUTHENTICATING, IS_SIGNING_UP } from '../constants/account/accountLoaderTypes';
import { SET_SIGN_IN_ERROR, SET_SIGN_UP_ERROR } from '../constants/account/accountErrorTypes';
import { GET_AUTH_URL, GET_USER_URL, POST_SIGNUP_URL, GET_RESEND_URL } from '../constants/account/accountEndpoints';
import { SET_EMAIL_SENT_SUCCESSFULL, SET_VERIFY_USER_ID, IS_RESENDING_EMAIL, SET_EMAIL_SENT_ERROR } from '../constants/verify/verifyReducerTypes';

/**
 * Get authentication token for user
 * @param { email, password }
 */
export function postSignInUser(details, ctx) {
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
            console.log(axios.default.headers);
            ctx.props.getUserInfo(userId, ctx);
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
 * Get logged in user information
 * @param userId
 */
export function getUserInfo(userId, ctx) {
    return function (dispatch) {
        dispatch({ type: IS_AUTHENTICATING, data: true });
        axios.get(GET_USER_URL, {
          params: { userId: userId }
        })
        .then(response => {
            dispatch({
                type: SET_AUTH_USER,
                data: {
                    name: response.data.name,
                    type: response.data.type,
                    profilePhotoUrl: response.data.profilePhotoUrl,
                    profileCompleted: response.data.profileComplete
                }
            });
            dispatch({ type: IS_AUTHENTICATING, data: false });
            ctx.props.history.push('/dashboard');
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
      ctx.props.history.push('/verify');
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

export function setupUser(token, values, history) {
  return function (dispatch) {
    dispatch({
      type: IS_SETTING_UP,
      data: true
    });
    console.log(values);
    // history.push('/dashboard');
    // axios({
    //   method: 'POST',
    //   url: POST_SETUP_URL,
    //   data: values
    // })
    // .then(resp => {
    //   console.log(resp);
    // })
    // .catch(err => {
    //   console.log(err);
    //   dispatch({
    //     type: SET_API_ERROR,
    //     error: err
    //   });
    //   dispatch({
    //     type: SET_SETUP_ERROR,
    //     error: err.response
    //   });
    // })
    dispatch({
      type: IS_SETTING_UP,
      data: false
    })
  }
}
