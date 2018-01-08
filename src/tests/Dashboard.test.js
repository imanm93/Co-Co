import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import Dashboard from '../containers/Dashboard';

describe("Dashboard", () => {
  let props;

  const mountedApp = () => {
    if (!mountedApp) {
      mountedApp = mount(
        <Dashboard {...props} />
      );
    }
    return mountedApp;
  }

});
