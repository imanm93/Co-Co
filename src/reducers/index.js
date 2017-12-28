import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import dashboardReducer from './dashboardReducer';
import accountReducer from './accountReducer';
import profileReducer from './profileReducer';
import filtersReducer from './filtersReducer';
import skillsReducer from './skillsReducer';
import loaderReducer from './loaderReducer';
import itemsReducer from './itemsReducer';
import apiReducer from './apiReducer';

const rootReducer = combineReducers({
  form: formReducer,
  account: accountReducer,
  profiles: profileReducer,
  filters: filtersReducer,
  dash: dashboardReducer,
  skills: skillsReducer,
  loader: loaderReducer,
  items: itemsReducer,
  api: apiReducer
});

export default rootReducer;
