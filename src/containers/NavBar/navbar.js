import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import * as actions from '../../actions/profileActions';

import NewPostButton from '../../components/NewPostButton';
import NotificationsBar from '../NotificationsBar';

class NavBar extends Component {

  redirectToProfile() {
    this.props.setProfileViewId(this.props.userId, this.props.history);
  }

  render() {
    return(
      <div>
        This is the NavBar
        <Button onClick={this.redirectToProfile.bind(this)}>My Profile</Button>
        <NotificationsBar />
        <NewPostButton history={this.props.history} />
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    userId: state.account.userId
  }
}

export default connect(mapStateToProps, actions)(NavBar);
