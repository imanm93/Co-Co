import Rx from 'rxjs';
import Utils from '../utils';

import { GET_ITEM_COMMENT_URL, GET_ITEMS_BY_IDS } from '../constants/items/itemEndpoints';
import { SET_API_ERROR, CLEAR_API_ERROR } from '../constants/api/apiErrorTypes';
import { IS_LOADING_DASH_ITEMS, IS_LOADING_VIEW_SPECIFIC_ITEMS } from '../constants/dashboard/dashboardLoaderTypes';
import { FETCH_FILTERED_ITEMS, FETCH_EXPANDED_ITEM, FETCH_COMMENTS_FOR_ITEM, FETCH_ITEMS_BY_ID } from '../constants/items/itemFetchTypes';
import { SET_FILTERED_ITEMS, SET_EXPANDED_ITEM, SET_LOADING_COMMENTS, SET_COMMENTS, SET_EXPANDING_ITEM } from '../constants/items/itemReducerTypes';
import { FETCH_CONNECTIONS } from '../constants/connections/connectionFetchTypes';
import { SET_CONNECTIONS } from '../constants/connections/connectionReducerTypes';
import { GET_CONNECTIONS_URL } from '../constants/connections/connectionEndpoints';

export const getConnections = (action$, store) =>
  action$.ofType(FETCH_CONNECTIONS)
    .switchMap(action =>
      Rx.Observable.concat(
        Rx.Observable.of({
          type: IS_LOADING_DASH_ITEMS,
          data: true
        }),
        Rx.Observable.ajax({
          method: 'GET',
          url: GET_CONNECTIONS_URL,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + action.token
          }
        })
          .map(res => {
            let items = res.response;
            const newItems = Object.keys(items).map(item => {
              return Object.assign({}, items[item], { connectionState: 'connected' });
            });
            return newItems;
          })
          .map(connections => ({
            type: SET_FILTERED_ITEMS,
            items: connections,
            page: 1
          }))
          .catch(err => ({
            type: SET_API_ERROR,
            error: err.response ? err.response.data : 'There was a network error, please try again!'
          })),
        Rx.Observable.of({
          type: IS_LOADING_DASH_ITEMS,
          data: false
        })
      )
    )

export const getFilteredItems = (action$, store) =>
  action$.ofType(FETCH_FILTERED_ITEMS)
    .switchMap(action =>
      Rx.Observable.concat(
        Rx.Observable.of({
          type: CLEAR_API_ERROR
        }),
        Rx.Observable.of({
          type: IS_LOADING_DASH_ITEMS,
          data: true
        }),
        Rx.Observable.ajax({
          url: action.endpoint + '?' + action.query,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + action.token
          }
        })
          .map(payload => {
            return {
              page: payload.response.page,
              items: Object.assign({}, payload.response.dictionaryResults)
            };
          })
          .map(res => {
            let sortedItems = {};
            const sortedKeys = Utils.sortDateTimeV2(res.items, 'timestamp');
            sortedKeys.map(key => {
              return sortedItems[key] = Object.assign(res.items[key], { expanded: false, isExpanding: false, showComments: false, isLoadingComments: false });
            });
            return {
              page: res.page,
              items: sortedItems
            };
          })
          .map(res => ({
            type: SET_FILTERED_ITEMS,
            items: res.items,
            page: res.page
          }))
          .catch(err => {
            return Rx.Observable.of({
              type: SET_API_ERROR,
              error: err
            })
          }),
        Rx.Observable.of({
          type: IS_LOADING_DASH_ITEMS,
          data: false
        })
      )
    )

export const getExpandedItem = (action$, store) =>
  action$.ofType(FETCH_EXPANDED_ITEM)
    .switchMap(action =>
      Rx.Observable.concat(
        Rx.Observable.of({
          type: SET_EXPANDING_ITEM,
          id: action.itemId,
          data: true
        }),
        Rx.Observable.ajax({
          url: action.endpoint + '/' + action.itemId,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + action.token
          }
        })
        .map(payload => ({
          type: SET_EXPANDED_ITEM,
          id: action.itemId,
          data: payload.response,
          expanded: true,
          isExpanding: false
        }))
        .catch(err => ({
          type: SET_API_ERROR,
          error: err
        }))
      )
    )

export const getCommentsItem = (action$, store) =>
  action$.ofType(FETCH_COMMENTS_FOR_ITEM)
    .switchMap(action =>
      Rx.Observable.concat(
        Rx.Observable.of({
          type: SET_LOADING_COMMENTS,
          id: action.itemId,
          showComments: true,
          isLoadingComments: true
        }),
        Rx.Observable.ajax({
          url: GET_ITEM_COMMENT_URL + '/' + action.itemId,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + action.token
          }
        })
          .map(res => {
            return ({
              type: SET_COMMENTS,
              id: action.itemId,
              data: res.response.results
            })
          })
          .catch(err => ({
            type: SET_API_ERROR,
            error: err
          })),
        Rx.Observable.of({
          type: SET_LOADING_COMMENTS,
          id: action.itemId,
          showComments: true,
          isLoadingComments: false
        })
      )
    )
