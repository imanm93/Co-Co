/**
 * File upload Actions
 * @desc Any actions required to upload files from the client to server
 */
import axios from '../utils/axios';
import { FILE_UPLOAD_URL } from '../constants/file/fileEndpoints';
import { IS_UPLOADING_IMAGE } from '../constants/file/fileLoaderTypes';
import { SET_API_ERROR } from '../constants/api/apiErrorTypes';

export function uploadFile(data, callback) {
  return function (dispatch) {
    dispatch({ type: IS_UPLOADING_IMAGE, data: true });
    axios.post(FILE_UPLOAD_URL, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    .then(res => {
      dispatch({ type: IS_UPLOADING_IMAGE, data: false });
      callback(res.data.result);
    })
    .catch(err => {
      dispatch({
        type: SET_API_ERROR,
        data: err
      });
      dispatch({ type: IS_UPLOADING_IMAGE, data: false });
    });
  }
}
