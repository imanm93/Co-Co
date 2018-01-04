import { SET_POST_TAB, SET_POST_ITEM_STATUS } from '../constants/postForm/postFormReducerTypes';
import * as ItemTypes from '../constants/items/itemTypes';

const initialState = {
  tab: ItemTypes.OPP_ITEM,
  status: ''
}

export default function (state=initialState, action) {
  switch(action.type) {
    case SET_POST_TAB:
      return { ...state, ...{ tab: action.tab } };
    case SET_POST_ITEM_STATUS:
      return { ...state, ...{ status: action.data } };
    default:
      return state;
  }
}
