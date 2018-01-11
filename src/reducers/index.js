import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import notifcationsReducer from './notificationsReducer';
import connectionsReducer from './connectionsReducer';
import dashboardReducer from './dashboardReducer';
import externalReducer from './externalReducer';
import accountReducer from './accountReducer';
import profileReducer from './profileReducer';
import filtersReducer from './filtersReducer';
import skillsReducer from './skillsReducer';
import loaderReducer from './loaderReducer';
import verifyReducer from './verifyReducer';
import setupReducer from './setupReducer';
import itemsReducer from './itemsReducer';
import errorReducer from './errorReducer';
import postReducer from './postsReducer';
import apiReducer from './apiReducer';

const rootReducer = combineReducers({
  notifications: notifcationsReducer,
  connections: connectionsReducer,
  external: externalReducer,
  profiles: profileReducer,
  account: accountReducer,
  filters: filtersReducer,
  dash: dashboardReducer,
  loaders: loaderReducer,
  skills: skillsReducer,
  verify: verifyReducer,
  errors: errorReducer,
  items: itemsReducer,
  setup: setupReducer,
  posts: postReducer,
  form: formReducer,
  api: apiReducer
});

export default rootReducer;
