import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import accountReducer from './accountReducer';
import apiReducer from './apiReducer';
import loaderReducer from './loaderReducer';

const rootReducer = combineReducers({
  form: formReducer,
  account: accountReducer,
  loader: loaderReducer,
  api: apiReducer
});

export default rootReducer;
