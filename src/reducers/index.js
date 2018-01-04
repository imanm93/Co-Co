import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

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
  external: externalReducer,
  profiles: profileReducer,
  account: accountReducer,
  filters: filtersReducer,
  dash: dashboardReducer,
  skills: skillsReducer,
  loader: loaderReducer,
  verify: verifyReducer,
  errors: errorReducer,
  items: itemsReducer,
  setup: setupReducer,
  posts: postReducer,
  form: formReducer,
  api: apiReducer
});

export default rootReducer;
