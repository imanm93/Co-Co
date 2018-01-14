import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import throttle from 'lodash/throttle';
import { saveState } from './localStorage';
import createHistory from 'history/createBrowserHistory';

import App from './app';
import store from './store';

//import registerServiceWorker from './registerServiceWorker';
//registerServiceWorker();

/**
 * Setup Piwik Connector
 */
const history = createHistory();

/**
 * Setup Redux store
 */
store.subscribe(throttle(() => {
  saveState({
      account: store.getState().account,
      filters: store.getState().filters,
      skills: store.getState().skills,
      profiles: store.getState().profiles
  });
}, 1000));

/**
 * Setup Root DOM for environment
 */
if (process.env.NODE_ENV === "production") {
    render(
        <Provider store={store}>
            <App history={history} />
        </Provider>,
        document.getElementById('root')
    );
} else {
    render(
        <Provider store={store}>
            <App history={history} />
        </Provider>,
        document.getElementById('root')
    );
}
