import { FETCH_PROFILE_DATA } from '../constants/profiles/profileFetchTypes';
import { SET_PROFILE_VIEW_ID } from '../constants/profiles/profileReducerTypes';

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
