import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/profileActions';

import ViewProfile from './components/viewprofile';
import EditProfile from './components/editprofile';

class Profile extends Component {

  componentWillMount() {
    if (this.props.profile.profileViewId) this.props.fetchProfileData(this.props.token, this.props.profile.profileViewId);
  }

  onEdit() {
    //TODO: switch to editable profile
  }

  render() {
    const type = this.props.match.params.type;
    return (
      <div>
        { type === 'view' &&
            <ViewProfile profile={this.props.profile} />
        }
        { type === 'edit' && this.props.userId === this.props.profile.profileViewId &&
            <EditProfile profile={this.props.profile} />
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profiles,
    userId: state.account.userId,
    token: state.account.token
  }
}

export default connect(mapStateToProps, actions)(Profile);
