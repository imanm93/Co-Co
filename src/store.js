import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { routerMiddleware } from 'react-router-redux';
import { loadState } from './localStorage';
import { history } from './history';

//import loggerRedux from './loggerredux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import epics from './epics';

const persistedState = loadState();
const epicMiddleware = createEpicMiddleware(epics);
const createStoreWithMiddleware = applyMiddleware(reduxThunk, epicMiddleware, routerMiddleware(history))(createStore);

export default createStoreWithMiddleware(reducers, persistedState);
