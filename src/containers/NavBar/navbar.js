import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Dropdown } from 'semantic-ui-react';
import styles from './navbar.css';
import * as actions from '../../actions/profileActions';

import NewPostButton from '../../components/NewPostButton';
import NotificationsBar from '../NotificationsBar';

class NavBar extends Component {

  redirectToProfile() {
    this.props.setProfileViewId(this.props.userId, this.props.history);
  }

  signOut() {
    // TODO: Console.log('signing out');
  }

  render() {
    return(
      <Grid.Row verticalAlign='middle' style={{ backgroundColor: '#FFF', padding: 0 }}>
        <Grid.Column width={3} stretched style={{
          backgroundColor: '#292F2E'
        }}>
        </Grid.Column>
        <Grid.Column width={6}>
          <NotificationsBar />
        </Grid.Column>
        <Grid.Column width={4} textAlign='right'>
          <Dropdown
            className="navbar-btn-my-profile"
            trigger={
              <span>
                <div className="profilePic">
                  <img
                    src={this.props.profilePhotoUrl}
                    alt={`profile of ${this.props.name}`}
                  />
                </div>
              </span>
            }
            pointing='top'
            icon={null}>
            <Dropdown.Menu>
                <Dropdown.Item text='Profile' icon="user" onClick={this.redirectToProfile.bind(this)} />
                <Dropdown.Item text='Sign Out' icon="sign out" onClick={this.signOut.bind(this)} />
            </Dropdown.Menu>
          </Dropdown>
        </Grid.Column>
        <Grid.Column width={3}>
          <Grid.Row>
            <NewPostButton history={this.props.history} />
          </Grid.Row>
        </Grid.Column>
      </Grid.Row>
    )
  }

}

function mapStateToProps(state) {
  return {
    userId: state.account.userId,
    name: state.account.name
  }
}

export default connect(mapStateToProps, actions)(NavBar);
