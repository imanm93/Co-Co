import axios from '../utils/axios';

import { SET_API_ERROR } from '../constants/api/apiErrorTypes';
import { IS_LOADING_EXTERNAL } from '../constants/external/externalLoaderTypes';
import { POST_EXTERNAL_URL, GET_EXTERNAL_COMPANY_URL } from '../constants/external/externalEndpoints';
import { SET_COMPANY_DETAILS, SET_COMPANY_ERROR, SET_COMPANY_VERIFY_ERROR } from '../constants/external/externalReducerTypes';

export function verifiedExternal(values, callback) {
  return function (dispatch) {
    dispatch({
      type: IS_LOADING_EXTERNAL,
      data: true
    });
    dispatch({
      type: SET_COMPANY_VERIFY_ERROR,
      error: ''
    });
    axios({
      method: 'GET',
      url: GET_EXTERNAL_COMPANY_URL + '/' + values.email
    })
    .then(res => {
      dispatch({
        type: SET_COMPANY_DETAILS,
        data: res.data
      });
      dispatch({
        type: IS_LOADING_EXTERNAL,
        data: false
      });
      callback(1);
    })
    .catch(err => {
      if (err.response.status === 404) {
        dispatch({
          type: SET_COMPANY_VERIFY_ERROR,
          error: err.response.data.message
        });
      }
      if (err.status !== 404) {
        dispatch({
          type: SET_API_ERROR,
          error: err
        });
      }
      dispatch({
        type: IS_LOADING_EXTERNAL,
        data: false
      });
      callback(0);
    });
  }
}

export function registerExternal(values, callback) {
  return function (dispatch) {
    dispatch({
      type: IS_LOADING_EXTERNAL,
      data: true
    });
    dispatch({
      type: SET_COMPANY_ERROR,
      error: ''
    });
    axios({
      method: 'POST',
      url: POST_EXTERNAL_URL,
      data: values
    })
    .then(resp => {
      dispatch({
        type: SET_COMPANY_DETAILS,
        data: resp.response
      });
      dispatch({
        type: IS_LOADING_EXTERNAL,
        data: false
      });
      callback(1);
    })
    .catch(err => {
      if (err.response.status === 409)
      {
        dispatch({
          type: SET_COMPANY_ERROR,
          error: err.response.data.message
        });
      }
      dispatch({
        type: SET_API_ERROR,
        error: err
      });
      dispatch({
        type: IS_LOADING_EXTERNAL,
        data: false
      });
      callback(0);
    });
  }
}
