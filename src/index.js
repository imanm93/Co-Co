import React from 'react';
import { render } from 'react-dom';
import throttle from 'lodash/throttle';
import { Provider } from 'react-redux';
import { saveState } from './localStorage';
import createHistory from 'history/createBrowserHistory';

import App from './app';
import store from './store';

//import registerServiceWorker from './registerServiceWorker';

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
      skills: store.getState().skills
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

//registerServiceWorker();
