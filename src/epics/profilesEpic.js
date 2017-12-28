import Rx from 'rxjs';
import { GET_PROFILE } from '../constants/profiles/profileEndpoints';
import { SET_API_ERROR } from '../constants/api/apiErrorTypes';
import { FETCH_PROFILE_DATA } from '../constants/profiles/profileFetchTypes';
import { SET_PROFILE_VIEW_DATA } from '../constants/profiles/profileReducerTypes';

export const getProfileData = (action$, store) =>
  action$.ofType(FETCH_PROFILE_DATA)
    .switchMap(action =>
      Rx.Observable.ajax({
        url: GET_PROFILE + '/' + action.userId,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + action.token
        }
      })
      .map(res => ({
        type: SET_PROFILE_VIEW_DATA,
        data: res.response
      }))
      .catch(err => ({
        type: SET_API_ERROR,
        error: err
      }))
    )
