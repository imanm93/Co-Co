import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/profileActions';

import ViewProfile from './components/viewprofile';
import EditProfileForm from './components/editprofileform';

class Profile extends Component {

  componentWillMount() {
    if (this.props.profile.profileViewId) this.props.fetchProfileData(this.props.token, this.props.profile.profileViewId);
  }

  onEdit() {
    this.props.history.push('/profile/edit');
  }

  render() {
    const type = this.props.match.params.type;
    return (
      <div>
        { type === 'view' &&
            <ViewProfile userId={this.props.userId} profileViewData={this.props.profile.profileViewData} onEdit={this.onEdit.bind(this)} />
        }
        { type === 'edit' && this.props.userId === this.props.profile.profileViewId &&
            <EditProfileForm profile={this.props.profile} />
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
