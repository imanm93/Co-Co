/**
 * Item actions
 * @desc All actions associated with getting and posting items
 */
import qs from 'qs';
import axios from '../utils/axios';
import * as ItemTypes from '../constants/items/itemTypes';
import * as DashboardTabs from '../constants/dashboard/dashboardTypes';
import { SET_API_ERROR } from '../constants/api/apiErrorTypes';
import { FETCH_FILTERED_ITEMS, FETCH_EXPANDED_ITEM } from '../constants/items/itemFetchTypes';
import { GET_FILTERED_ITEMS_URL, GET_FILTERED_EVENT_ITEMS_URL, GET_FILTERED_OPP_ITEMS_URL, GET_FILTERED_STATUS_ITEMS_URL, GET_EXPANDED_OPP_ITEM_URL, GET_EXPANDED_EVENT_ITEM_URL } from '../constants/items/itemEndpoints';

export const fetchFilteredItems = (token, userId, tab, search, filter, page) => {
    let action = {};
    action['type'] = FETCH_FILTERED_ITEMS;
    action['token'] = token;
    action['query'] = qs.stringify({
      UserId: userId,
      query: search,
      page: page,
      pageSize: 15
    });
    const filters = [].concat(Object.keys(filter).map(key => {
        return key + '=' + filter[key]
    })).join('&');
    action['query'] = action['query'] + '&' + filters;
    switch(tab) {
      case DashboardTabs.ALL_RESULTS:
        action['endpoint'] = GET_FILTERED_ITEMS_URL;
        break;
      case DashboardTabs.OPPORTUNITIES:
        action['endpoint'] = GET_FILTERED_OPP_ITEMS_URL;
        break;
      case DashboardTabs.EVENTS:
        action['endpoint'] = GET_FILTERED_EVENT_ITEMS_URL;
        break;
      case DashboardTabs.STATUS:
        action['endpoint'] = GET_FILTERED_STATUS_ITEMS_URL;
        break;
    }
    return (action);
}

export const fetchExpandedItem = (token, type, itemId, userId) => {
    let action = {};
    action['type'] = FETCH_EXPANDED_ITEM;
    action['token'] = token;
    action['itemId'] = itemId;
    switch (type) {
        case ItemTypes.OPP_ITEM:
            action['endpoint'] = GET_EXPANDED_OPP_ITEM_URL;
            break;
        case ItemTypes.EVENT_ITEM:
            action['endpoint'] = GET_EXPANDED_EVENT_ITEM_URL;
            break;
    }
    return (action);
}

export function postItem(token, type, values) {
  return function (dispatch) {
    let endpoint = '';
    switch(type) {
      case ItemTypes.OPP_ITEM:
          endpoint = GET_FILTERED_OPP_ITEMS_URL;
          break;
      case ItemTypes.EVENT_ITEM:
          endpoint = GET_FILTERED_EVENT_ITEMS_URL;
          break;
      case ItemTypes.STATUS_ITEM:
          endpoint = GET_FILTERED_STATUS_ITEMS_URL;
          break;
    }
    axios.post(endpoint, values)
    .then(res => {
      console.log(res);
    })
    .catch(err => ({
      type: SET_API_ERROR,
      error: err
    }))
  }
}
