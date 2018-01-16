import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import throttle from 'lodash/throttle';
import { saveState } from './localStorage';
import { history } from './history';

import App from './app';
import store from './store';

//import registerServiceWorker from './registerServiceWorker';
//registerServiceWorker();

/**
 * Setup Redux store
 */
store.subscribe(throttle(() => {
  saveState({
      account: store.getState().account,
      filters: store.getState().filters,
      skills: store.getState().skills,
      profiles: {
        profileViewId: store.getState().profiles.profileViewId,
        profileViewData: {},
        profileEditData: {}
      }
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
