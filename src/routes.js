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
import UserProfile from './containers/UserProfile';
import VerifiedEmail from './containers/VerifiedEmail';
import ResetPassword from './containers/ResetPassword';
import ForgotPassword from './containers/ForgotPassword';
import VerifiedCompany from './containers/VerifiedCompany';
import ViewSpecificItems from './containers/ViewSpecificItems';
import PostNewItemContainer from './containers/PostNewItemContainer';
import NotificationsConnectionRequests from './containers/NotificationsConnectionRequests';

/**
 * Components
 */
import NotFoundPage from './components/NotFoundPage';
const Routes = () => (
  <Switch>
      <Route exact path="/" component={withGATracker(Landing)} />
      <Route path="/verify" component={withGATracker(Verify)} />
      <Route path="/signup" component={withGATracker(SignUp)} />
      <Route path="/signin" component={withGATracker(SignIn)} />
      <Route path="/dashboard" component={withGATracker(Dashboard)} />
      <Route path="/external/:step" component={withGATracker(External)} />
      <Route path="/profile/:type" component={withGATracker(UserProfile)} />
      <Route path="/post" component={withGATracker(PostNewItemContainer)} />
      <Route path="/resetpassword" component={withGATracker(ResetPassword)}/>
      <Route path="/verifiedemail" component={withGATracker(VerifiedEmail)} />
      <Route path="/forgotpassword" component ={withGATracker(ForgotPassword)} />
      <Route path="/verifiedcompany" component={withGATracker(VerifiedCompany)} />
      <Route path="/view/items/:itemIds" component={withGATracker(ViewSpecificItems)} />
      <Route path="/notifications/connections" component={withGATracker(NotificationsConnectionRequests)} />
      <Route component={NotFoundPage} />
  </Switch>
)

export default Routes;
