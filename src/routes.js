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
import SignIn from './containers/SignIn';
import Dashboard from './containers/Dashboard';

/**
 * Components
 */
import NotFoundPage from './components/NotFoundPage';

const Routes = () => (
  <Switch>
      <Route exact path="/" component={withGATracker(Landing)} />
      <Route path="/signin" component={SignIn} />
      <Route path="/dashboard" component={Dashboard} />
      <Route component={NotFoundPage} />
  </Switch>
)

export default Routes;
