import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { loadState } from './localStorage';

//import loggerRedux from './loggerredux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import epics from './epics';

const persistedState = loadState();
const epicMiddleware = createEpicMiddleware(epics);
const createStoreWithMiddleware = applyMiddleware(reduxThunk, epicMiddleware)(createStore);

export default createStoreWithMiddleware(reducers, persistedState);
