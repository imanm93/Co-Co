/**
 * User Account Actions
 * @desc All actions associated with the user's account
 */
import qs from 'qs';
import axios from '../utils/axios';
import jwt_decode from 'jwt-decode';

import { GET_AUTH_URL, GET_USER_URL } from '../constants/account/accountEndpoints';
import { IS_AUTHENTICATING } from '../constants/account/accountLoaderTypes';
import { SET_AUTH_USER } from '../constants/account/accountReducerTypes';
import { SET_SIGN_IN_ERROR } from '../constants/account/accountErrorTypes';
import { SET_API_ERROR } from '../constants/api/apiErrorTypes';

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
                    profileCompleted: response.data.profileComplete,
                    type: response.data.type,
                    profilePhotoUrl: response.data.profilePhotoUrl,
                    name: response.data.name
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
