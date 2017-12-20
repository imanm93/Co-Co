import * as ItemTypes from '../constants/items/itemTypes';
import { FETCH_FILTERED_ITEMS, FETCH_EXPANDED_ITEM } from '../constants/items/itemFetchTypes';
import { GET_EXPANDED_OPP_ITEM, GET_EXPANDED_EVENT_ITEM } from '../constants/items/itemEndpoints';

export const fetchFilteredItems = (user, filter, page) => ({
  type: FETCH_FILTERED_ITEMS,
  user: 'UserId=' + user,
  filter: filter,
  pageSize: 15,
  page: page
})

export const fetchExpandedItem = (type, itemId, userId) => {
  let action = {};
  action['type'] = FETCH_EXPANDED_ITEM;
  action['user'] = '?UserId=' + userId;
  action['itemId'] = itemId;
  switch (type) {
    case ItemTypes.OPP_ITEM:
      action['endpoint'] = GET_EXPANDED_OPP_ITEM;
      return (action);
    case ItemTypes.EVENT_ITEM:
      action['endpoint'] = GET_EXPANDED_EVENT_ITEM;
      return (action);
    default:
      return null;
  }
}
