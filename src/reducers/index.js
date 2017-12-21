import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import accountReducer from './accountReducer';
import filtersReducer from './filtersReducer';
import searchReducer from './searchReducer';
import loaderReducer from './loaderReducer';
import itemsReducer from './itemsReducer';
import apiReducer from './apiReducer';

const rootReducer = combineReducers({
  form: formReducer,
  account: accountReducer,
  filters: filtersReducer,
  search: searchReducer,
  loader: loaderReducer,
  items: itemsReducer,
  api: apiReducer
});

export default rootReducer;
