/**
 * Setup Route & User Tracking
 */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import withGATracker from './withGATracker';

/**
 * Containers
 */
import SignUp from './containers/SignUp';
import Verify from './containers/Verify';
import SignIn from './containers/SignIn';
import Landing from './containers/Landing';
import External from './containers/External';
import UserSetup from './containers/UserSetup';
import Dashboard from './containers/Dashboard';
import PostNewItem from './containers/PostNewItem';
import UserProfile from './containers/UserProfile';
import VerifiedEmail from './containers/VerifiedEmail';
import VerifiedCompany from './containers/VerifiedCompany';

/**
 * Components
 */
import NotFoundPage from './components/NotFoundPage';

// <Route path="/signup" component={SignUp} />

const Routes = () => (
  <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/verify" component={Verify} />
      <Route path="/signin" component={SignIn} /> 
      <Route path="/setup" component={UserSetup} />
      <Route path="/post" component={PostNewItem} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/external/:step" component={External} />
      <Route path="/profile/:type" component={UserProfile} />
      <Route path="/verifiedemail" component={VerifiedEmail} />
      <Route path="/verifiedcompany" component={VerifiedCompany} />
      <Route component={NotFoundPage} />
  </Switch>
)

export default Routes;
