import Rx from 'rxjs';
import { GET_PROFILE } from '../constants/profiles/profileEndpoints';
import { SET_API_ERROR } from '../constants/api/apiErrorTypes';
import { FETCH_PROFILE_DATA } from '../constants/profiles/profileFetchTypes';
import { SET_PROFILE_VIEW_DATA, SET_MY_PROFILE_DATA } from '../constants/profiles/profileReducerTypes';
import { IS_LOADING_PROFILE } from '../constants/profiles/profileLoaderTypes';

export const getProfileData = (action$, store) =>
  action$.ofType(FETCH_PROFILE_DATA)
    .switchMap(action =>
      Rx.Observable.concat(
        Rx.Observable.of({
          type: IS_LOADING_PROFILE,
          data: true
        }),
        Rx.Observable.ajax({
          method: 'GET',
          url: GET_PROFILE + '/' + action.userId,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + action.token
          }
        })
        .map(res => {
          if (action.my) {
            return ({
              type: SET_MY_PROFILE_DATA,
              data: res.response
            })
          }
          else {
            return ({
              type: SET_PROFILE_VIEW_DATA,
              data: res.response
            })
          }
        })
        .catch(err => ({
          type: SET_API_ERROR,
          error: err
        })),
        Rx.Observable.of({
          type: IS_LOADING_PROFILE,
          data: false
        })
      )
    )
