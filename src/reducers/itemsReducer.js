import { SET_FILTERED_ITEMS } from '../constants/items/itemReducerTypes';

const initialState = {
  items: {},
  page: 0,
  pageSize: 15
}

export default function(state=initialState, action) {
  switch(action.type) {
    case SET_FILTERED_ITEMS:
        return { ...state, ...{ items: action.items, page: action.page } };
    default:
        return state;
  }
}
