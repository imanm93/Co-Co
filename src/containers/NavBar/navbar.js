import React, { Component } from 'react';
import styles from './navbar.css';
import { connect } from 'react-redux';
import { Grid, Dropdown, Button } from 'semantic-ui-react';
import * as actions from '../../actions/profileActions';

import NewPostButton from '../../components/NewPostButton';
import NotificationsBar from '../NotificationsBar';

class NavBar extends Component {

  redirectToProfile() {
    console.log('moving');
    console.log(this.props.userId);
    this.props.setProfileViewId(this.props.token, this.props.userId, this.props);
  }

  redirectToDashboard() {
    this.props.history.push('/dashboard');
  }

  signOut() {
    this.props.signOutUser(this.props.token, this.props.userId, this.props.history);
  }

  render() {
    return(
      <Grid.Row style={{ backgroundColor: '#FFF', padding: 0 }}>
        <Grid.Column width={2} style={{
          backgroundSize: 'contain',
          backgroundColor: '#2A2A2A',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: 'url(https://coandco.blob.core.windows.net/systemimagescoandco/files/coandco_white.png)',
          border: '6px solid #2A2A2A',
          cursor: 'pointer'
        }} onClick={this.redirectToDashboard.bind(this)}>
        </Grid.Column>
        <Grid.Column width={10}>
          <NotificationsBar token={this.props.token} />
        </Grid.Column>
        <Grid.Column width={1} textAlign='right'>
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
    token: state.account.token,
    name: state.account.name
  }
}

export default connect(mapStateToProps, actions)(NavBar);
