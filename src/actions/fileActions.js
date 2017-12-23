/**
 * File upload Actions
 * @desc Any actions required to upload files from the client to server
 */
import axios from '../utils/axios';
import { FILE_UPLOAD_URL } from '../constants/file/fileEndpoints';
import { SET_API_ERROR } from '../constants/api/apiErrorTypes';

export function uploadFile(data, callback) {
  return function (dispatch) {
    // TODO: post file to storagecoandco
    callback('https://images.url');
    // axios.post(FILE_UPLOAD_URL, date, {
    //   headers: { 'Content-Type': 'multipart/form-data' }
    // })
    // .then(imageUrl => {
    //   TODO: send image url back
    // })
    // .catch(err => {
    //   dispatch({
    //     type: SET_API_ERROR,
    //     data: err
    //   });
    // });
  }
}
