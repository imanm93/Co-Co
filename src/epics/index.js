import { combineEpics } from 'redux-observable';
import { getProfileData } from './profilesEpic';
import { getSkills, getStreams } from './skillsEpic';
import { getExternalVerification } from './externalsEpic';
import { getFilteredItems, getExpandedItem, getCommentsItem } from './itemsEpic';
import { getTopicsEpic, getOppTypesEpic, getEventTypesEpic } from './filtersEpic';
import { getCourses, getYears, getSignUpSources, getSignUpReasons } from './setupEpic';

export default combineEpics(
  getYears,
  getSkills,
  getStreams,
  getCourses,
  getTopicsEpic,
  getProfileData,
  getOppTypesEpic,
  getExpandedItem,
  getCommentsItem,
  getFilteredItems,
  getSignUpReasons,
  getSignUpSources,
  getEventTypesEpic,
  getExternalVerification
);
