import { combineEpics } from 'redux-observable';
import { getTopicsEpic, getOppTypesEpic, getEventTypesEpic } from './filtersEpic';
import { getFilteredItems, getExpandedItem } from './itemsEpic';
import { getProfileData } from './profilesEpic';
import { getSkills } from './skillsEpic';

export default combineEpics(
  getSkills,
  getTopicsEpic,
  getOppTypesEpic,
  getEventTypesEpic,
  getFilteredItems,
  getExpandedItem,
  getProfileData
);
