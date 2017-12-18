import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import App from '../app';

describe("App", () => {
    let props;
    let mountedApp;
    const mountedApp = () => {
      if (!mountedApp) {
        mountedApp = mount(
          <App {...props} />
        );
      }
      return mountedApp;
    }

    beforeEach(() => {
      props = {
        history: undefined;
      };
      mountedApp = undefined;
    })

    it('always renders a ConnectedRouter', () => {
      const connectedRouter = App.find('ConnectedRouter');
      expect(connectedRouter.length).toBeGreaterThan(0);
    });

});
