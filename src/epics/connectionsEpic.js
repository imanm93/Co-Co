import Rx from 'rxjs';

import { SET_API_ERROR } from '../constants/api/apiErrorTypes';
import { SET_CONNECTIONS, SET_CONNECTION_REQUESTS } from '../constants/connections/connectionReducerTypes';
import { IS_LOADING_CONNECTION_NOTIFICATIONS } from '../constants/connections/connectionLoaderTypes';
import { FETCH_CONNECTIONS, FETCH_CONNETION_REQUESTS } from '../constants/connections/connectionFetchTypes';
import { GET_CONNECTIONS_URL, GET_CONNECTION_REQUESTS_URL } from '../constants/connections/connectionEndpoints';

export const getConnectionRequests = (action$, store) =>
  action$.ofType(FETCH_CONNETION_REQUESTS)
    .switchMap(action =>
      Rx.Observable.concat(
        Rx.Observable.of({
          type: IS_LOADING_CONNECTION_NOTIFICATIONS,
          data: true
        }),
        Rx.Observable.ajax({
          method: 'GET',
          url: GET_CONNECTION_REQUESTS_URL,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + action.token
          }
        })
        .map(res => ({
          type: SET_CONNECTION_REQUESTS,
          data: res.response
        }))
        .catch(err => ({
          type: SET_API_ERROR,
          error: err.response ? err.response.data : 'There was a network error, please try again!'
        })),
        Rx.Observable.of({
          type: IS_LOADING_CONNECTION_NOTIFICATIONS,
          data: false
        })
      )
    )
