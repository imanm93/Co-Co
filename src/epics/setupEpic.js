import Rx from 'rxjs';
import { GET_SIGN_UP_SOURCES_URL, GET_COURSES_URL, GET_YEARS_URL, GET_SIGN_UP_REASONS_URL } from '../constants/setup/setupEndpoints';
import { FETCH_COURSES, FETCH_YEARS, FETCH_SIGN_UP_SOURCES, FETCH_SIGN_UP_REASONS } from '../constants/setup/setupFetchTypes';
import { SET_COURSES, SET_YEARS, SET_SIGN_UP_SOURCES, SET_SIGN_UP_REASONS } from '../constants/setup/setupReducerTypes';
import { SET_API_ERROR } from '../constants/api/apiErrorTypes';

export const getCourses = (action$, store) =>
  action$.ofType(FETCH_COURSES)
    .switchMap(action =>
      Rx.Observable.ajax({
        url: GET_COURSES_URL,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .map(res => ({
        type: SET_COURSES,
        data: res.response
      }))
      .catch(err => ({
        type: SET_API_ERROR,
        error: err
      }))
    )

export const getYears = (action$, store) =>
  action$.ofType(FETCH_YEARS)
    .switchMap(action =>
      Rx.Observable.ajax({
        url: GET_YEARS_URL,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .map(res => ({
        type: SET_YEARS,
        data: res.response
      }))
      .catch(err => ({
        type: SET_API_ERROR,
        error: err
      }))
    )

export const getSignUpSources = (action$, store) =>
  action$.ofType(FETCH_SIGN_UP_SOURCES)
    .switchMap(action =>
      Rx.Observable.ajax({
        url: GET_SIGN_UP_SOURCES_URL,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .map(res => ({
        type: SET_SIGN_UP_SOURCES,
        data: res.response
      }))
      .catch(err => ({
        type: SET_API_ERROR,
        error: err
      }))
    )

export const getSignUpReasons = (action$, store) =>
  action$.ofType(FETCH_SIGN_UP_REASONS)
    .switchMap(action =>
      Rx.Observable.ajax({
        url: GET_SIGN_UP_REASONS_URL,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .map(res => ({
        type: SET_SIGN_UP_REASONS,
        data: res.response
      }))
      .catch(err => ({
        type: SET_API_ERROR,
        error: err
      }))
    )
