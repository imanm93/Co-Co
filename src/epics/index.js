import { combineEpics } from 'redux-observable';
import { getTopicsEpic, getOppTypesEpic, getEventTypesEpic } from './filtersEpic';
import { getFilteredItems, getExpandedItem } from './itemsEpic';

export default combineEpics(
  getTopicsEpic,
  getOppTypesEpic,
  getEventTypesEpic,
  getFilteredItems,
  getExpandedItem
);
