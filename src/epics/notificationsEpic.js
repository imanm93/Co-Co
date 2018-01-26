import Rx from 'rxjs';

import { push } from 'react-router-redux';
import { SET_API_ERROR } from '../constants/api/apiErrorTypes';
import { SET_NOTIFICATIONS } from '../constants/notifications/notificationReducerTypes';
import { FETCH_NOTIFICATIONS } from '../constants/notifications/notificationFetchTypes';
import { GET_NOTIFICATIONS_URL } from '../constants/notifications/notificationEndpoints';
import { IS_LOADING_NOTIFICATIONS } from '../constants/notifications/notificationLoaderTypes';

export const getNotifications = (action$, store) =>
  action$.ofType(FETCH_NOTIFICATIONS)
    .switchMap(action =>
      Rx.Observable.concat(
        Rx.Observable.of({
          type: IS_LOADING_NOTIFICATIONS,
          data: true
        }),
        Rx.Observable.ajax({
          method: 'GET',
          url: GET_NOTIFICATIONS_URL,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': ' Bearer ' + action.token
          }
        })
        .map(res => ({
          type: SET_NOTIFICATIONS,
          data: res.response
        }))
        .catch(err => {
          Rx.Observable.of({
            type: SET_API_ERROR,
            data: err
          });
          if (err && err.status === 401) return Rx.Observable.of(push('/signin'));
          if (err && err.status === 403) return Rx.Observable.of(push('/signin'));
          if (err && err.status) return Rx.Observable.of({
            type: SET_NOTIFICATIONS,
            data: []
          });
        }),
        Rx.Observable.of({
          type: IS_LOADING_NOTIFICATIONS,
          data: false
        })
      )
    )
