import { SET_POST_TAB } from '../constants/postForm/postFormReducerTypes';

export function setPostFormTab(type) {
  return function (dispatch) {
    dispatch({
      type: SET_POST_TAB,
      tab: type
    });
  }
}
