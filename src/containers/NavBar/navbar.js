import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Grid } from 'semantic-ui-react';
import * as actions from '../../actions/profileActions';

import NewPostButton from '../../components/NewPostButton';
import NotificationsBar from '../NotificationsBar';

class NavBar extends Component {

  redirectToProfile() {
    this.props.setProfileViewId(this.props.userId, this.props.history);
  }

  render() {
    return(
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            Co & Co Logo
          </Grid.Column>
          <Grid.Column width={6}>
            <NotificationsBar />
          </Grid.Column>
          <Grid.Column width={4}>
            <Button onClick={this.redirectToProfile.bind(this)}>My Profile</Button>
          </Grid.Column>
          <Grid.Column width={2}>
            <NewPostButton history={this.props.history} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

}

function mapStateToProps(state) {
  return {
    userId: state.account.userId
  }
}

export default connect(mapStateToProps, actions)(NavBar);
