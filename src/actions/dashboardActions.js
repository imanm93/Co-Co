import { RESET_DASH, SET_DASH_TAB, SET_DASH_QUERY, SET_DASH_FILTER, SET_PAGE } from '../constants/dashboard/dashboardReducerTypes';

export function setDashQuery(query) {
  return function(dispatch) {
    dispatch({
      type: SET_DASH_QUERY,
      query: query
    });
  }
}

export function setDashFilter(filter) {
  return function(dispatch) {
    dispatch({
      type: SET_DASH_FILTER,
      filter: filter
    })
  }
}

export function setDashTab(tab) {
  return function (dispatch) {
    dispatch({
      type: SET_DASH_TAB,
      tab: tab,
      page: 1
    });
  }
}

export function resetDash() {
  return function (dispatch) {
    dispatch({
      type: RESET_DASH
    })
  }
}

export function setNextPage(page) {
  return function (dispatch) {
    dispatch({
      type: SET_PAGE,
      page: page
    })
  }
}
