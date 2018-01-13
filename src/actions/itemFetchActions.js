/**
 * Item actions
 * @desc All actions associated with getting and posting items
 */
import qs from 'qs';
import * as ItemTypes from '../constants/items/itemTypes';
import { RESET_COMMENTS } from '../constants/items/itemReducerTypes';
import * as DashboardTabs from '../constants/dashboard/dashboardTypes';
import { FETCH_CONNECTIONS } from '../constants/connections/connectionFetchTypes';
import { FETCH_FILTERED_ITEMS, FETCH_EXPANDED_ITEM, FETCH_COMMENTS_FOR_ITEM } from '../constants/items/itemFetchTypes';
import {
  GET_FILTERED_ITEMS_URL, GET_FILTERED_EVENT_ITEMS_URL, GET_FILTERED_OPP_ITEMS_URL, GET_FILTERED_STATUS_ITEMS_URL, GET_EXPANDED_OPP_ITEM_URL,
  GET_EXPANDED_EVENT_ITEM_URL, GET_FILTERED_PEOPLE_ITEMS_URL, GET_ITEMS_BY_IDS
} from '../constants/items/itemEndpoints';

export const fetchConnections = (token) => ({
  type: FETCH_CONNECTIONS,
  token: token
})

export const fetchViewSpecificItems = (token, itemIds) => {
  let action = {};
  action['type'] = FETCH_FILTERED_ITEMS;
  action['token'] = token;
  action['endpoint'] = GET_ITEMS_BY_IDS+"/"+itemIds.join();
  action['query'] = '';
  return (action);
}

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
  switch (tab) {
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
    case DashboardTabs.PEOPLE:
      action['endpoint'] = GET_FILTERED_PEOPLE_ITEMS_URL;
      break;
    default:
      action['endpoint'] = GET_FILTERED_ITEMS_URL;
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
    default:
      action['endpoint'] = GET_EXPANDED_OPP_ITEM_URL;
      break;
  }
  return (action);
}

export const fetchCommentsItem = (token, itemId) => ({
  type: FETCH_COMMENTS_FOR_ITEM,
  token: token,
  itemId: itemId
})

export const resetComments = (itemId) => ({
  type: RESET_COMMENTS,
  id: itemId
})
