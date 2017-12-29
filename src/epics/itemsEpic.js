import Rx from 'rxjs';
import Utils from '../utils';

import { SET_API_ERROR } from '../constants/api/apiErrorTypes';
import { IS_LOADING_DASH_ITEMS } from '../constants/dashboard/dashboardLoaderTypes';
import { FETCH_FILTERED_ITEMS, FETCH_EXPANDED_ITEM } from '../constants/items/itemFetchTypes';
import { SET_FILTERED_ITEMS, SET_EXPANDED_ITEM } from '../constants/items/itemReducerTypes';

export const getFilteredItems = (action$, store) =>
  action$.ofType(FETCH_FILTERED_ITEMS)
    .switchMap(action =>
        Rx.Observable.concat(
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
                  page: action.page,
                  items: Object.assign({}, payload.response.dictionaryResults)
              };
          })
          .map(res => {
              let sortedItems = {};
              const sortedKeys = Utils.sortDateTimeV2(res.items, 'timestamp');
              sortedKeys.map(key => {
                return sortedItems[key] = Object.assign(res.items[key], { expanded: false });
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
          .catch(err => ({
            type: SET_API_ERROR,
            error: err
          })),
          Rx.Observable.of({
            type: IS_LOADING_DASH_ITEMS,
            data: false
          })
        )
    )

export const getExpandedItem = (action$, store) =>
  action$.ofType(FETCH_EXPANDED_ITEM)
    .switchMap(action =>
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

// export const getCommentsItem = (action$, store) =>
//   action$.ofType(FETCH_ITEM_COMMENTS)
//     .switchMap(action =>
//       Rx.Observable.ajax(GET_COMMENTS_ITEM)
//       .map(res => {
//         //TODO: Update item comments state
//       })
//       .catch(err => {
//         //TODO: Update with any error
//       })
//     )

// export const postLike = (action$, store) =>
//     action$.ofType(FETCH_ITEM_LIKE_URL)
//       .switchMap(action =>
//         Rx.Obserbable.ajax(POST_ITEM_LIKE, action.itemId)
//         .map(res => Rx.Observable.of({
//           type: SET_API_RES,
//           data: res
//         }))
//         .catch(err => Rx.Observable.of({
//           type: SET_API_ERROR,
//           err: err
//         }))
//       )
