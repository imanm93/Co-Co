import { SET_FILTERED_ITEMS } from '../constants/items/itemReducerTypes';

const initialState = {
  filteredItems: {}
}

export default function(state=initialState, action) {
  switch(action.type) {
    case SET_FILTERED_ITEMS:
        return { ...state, ...{ filteredItems: action.data } };
    default:
        return state;
  }
}
