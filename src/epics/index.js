import { combineEpics } from 'redux-observable';

import { getProfileData } from './profilesEpic';
import { getSkills, getStreams } from './skillsEpic';
import { getNotifications } from './notificationsEpic';
import { getConnectionRequests } from './connectionsEpic';
import { getFilteredItems, getExpandedItem, getCommentsItem, getConnections } from './itemsEpic';
import { getTopicsEpic, getOppTypesEpic, getEventTypesEpic } from './filtersEpic';
import { getCourses, getYears, getSignUpSources, getSignUpReasons } from './setupEpic';
// import { getExternalVerification } from './externalsEpic';

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
  getConnectionRequests,
  getNotifications,
  getConnections  
);
