/**
 * Setup Route & User Tracking
 */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import withGATracker from './withGATracker';

/**
 * Containers
 */
import Landing from './containers/Landing';

/**
 * Components
 */
import NotFoundPage from './components/NotFoundPage';

const Routes = () => (
  <Switch>
      <Route exact path="/" component={withGATracker(Landing)} />
      <Route component={NotFoundPage} />
  </Switch>
)

export default Routes;
