import Rx from 'rxjs';

import { GET_TOPICS_URL, GET_OPP_TYPES_URL, GET_EVENT_TYPES_URL } from '../constants/filters/filtersEndpoints';
import { FETCH_TOPICS, FETCH_OPP_TYPES, FETCH_EVENT_TYPES } from '../constants/filters/filtersFetchTypes';
import { SET_TOPICS, SET_OPP_TYPES, SET_EVENT_TYPES } from '../constants/filters/filtersReducerTypes';
import { SET_API_ERROR } from '../constants/api/apiErrorTypes';

export const getTopicsEpic = (action$, store) =>
  action$.ofType(FETCH_TOPICS)
    .switchMap(action =>
      Rx.Observable.ajax({
        url: GET_TOPICS_URL,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + action.token
        }
      })
      .map(data => {
        return ({
          type: SET_TOPICS,
          data: data.response
        })
      })
      .catch(err => Rx.Observable.of({
        type: SET_API_ERROR,
        data: err
      }))
    )

export const getOppTypesEpic = (action$, store) =>
  action$.ofType(FETCH_OPP_TYPES)
    .switchMap(action =>
      Rx.Observable.ajax({
        url: GET_OPP_TYPES_URL,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + action.token
        }
      })
      .map(data => {
        return ({
          type: SET_OPP_TYPES,
          data: data.response
        })
      })
      .catch(err => Rx.Observable.of({
        type: SET_API_ERROR,
        data: err
      }))
    )

export const getEventTypesEpic = (action$, store) =>
  action$.ofType(FETCH_EVENT_TYPES)
    .switchMap(action =>
      Rx.Observable.ajax({
        url: GET_EVENT_TYPES_URL,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + action.token
        }
      })
      .map(data => {
        return ({
          type: SET_EVENT_TYPES,
          data: data.response
      })
    })
      .catch(err => Rx.Observable.of({
        type: SET_API_ERROR,
        data: err
      }))
    )
