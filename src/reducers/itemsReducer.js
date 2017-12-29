import * as ItemTypes from '../constants/items/itemTypes';
import { SET_FILTERED_ITEMS, SET_EXPANDED_ITEM } from '../constants/items/itemReducerTypes';

const initialState = {
  items: {},
  page: 0,
  pageSize: 15
}

export default function(state=initialState, action) {
  switch(action.type) {
    case SET_FILTERED_ITEMS:
        return { ...state, ...{ items: action.items, page: action.page } };
    case SET_EXPANDED_ITEM:
        let itemExpand = Object.assign({}, state.items[action.id]);
        switch(itemExpand.itemType) {
          case ItemTypes.OPP_ITEM:
            itemExpand["description"] = action.data.description;
            itemExpand["attachments"] = action.data.attachmentUrls;
            itemExpand["skills"] = action.data.skills;
            itemExpand["reward"] = action.data.reward;
            itemExpand["startTime"] = action.data.startTime;
            break;
          case ItemTypes.EVENT_ITEM:
            itemExpand["description"] = action.data.description;
            break;
          default:
            break;
        }
        itemExpand["expanded"] = true;
        itemExpand["isExpanding"] = false;
        const newItemExpanded = Object.assign({}, { [action.id]: itemExpand });
        return {
          ...state, ...{
            items: Object.assign({}, state.items, newItemExpanded)
          }
        };
    default:
        return state;
  }
}
