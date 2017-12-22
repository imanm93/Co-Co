import Rx from 'rxjs';
import Utils from '../utils';

import { FETCH_FILTERED_ITEMS, FETCH_EXPANDED_ITEM } from '../constants/items/itemFetchTypes';
import { SET_FILTERED_ITEMS, SET_EXPANDED_ITEM } from '../constants/items/itemReducerTypes';
import { GET_FILTERED_ITEMS } from '../constants/items/itemEndpoints';
import { SET_API_ERROR } from '../constants/api/apiErrorTypes';

export const getFilteredItems = (action$, store) =>
  action$.ofType(FETCH_FILTERED_ITEMS)
    .switchMap(action =>
        Rx.Observable.ajax(
          GET_FILTERED_ITEMS + '?' + action.user + action.filter
          + "&page=" + action.page + "&pageSize=" + action.pageSize
        )
        .map(payload => {
            console.log("payload", payload);
            return {
                page: action.page,
                items: Object.assign({}, payload.response.opportunities, payload.response.events, payload.response.posts)
            };
        })
        .map(res => {
            const sortedKeys = Utils.sortDateTimeV2(res.items, 'timestamp');
            let sortedItems = {};
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
            page: res.page,
            items: res.items,
            filter: action.filter
        }))
        .catch(err => ({
          type: SET_API_ERROR,
          error: err
        }))
    )

export const getExpandedItem = (action$, store) =>
  action$.ofType(FETCH_EXPANDED_ITEM)
    .switchMap(action =>
      Rx.Observable.ajax(
        action.endpoint + '/' + action.itemId + action.user
      )
        .map(payload => ({
          type: SET_EXPANDED_ITEM,
          id: action.itemId,
          comments: payload.response.comments,
          description: payload.response.description,
          skills: payload.response.skills,
          expanded: true,
          isExpanding: false
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
