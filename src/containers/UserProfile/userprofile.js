import React, { Component } from 'react';
import { connect } from 'react-redux';

import Profile from './components/profile';
import EditProfile from './components/editprofile';

class UserProfile extends Component {

  componentWillMount() {
    //TODO: get user profile
  }

  onEdit() {
    //TODO: switch to editable profile
  }

  render() {
    const type = this.props.match.params.type;
    return (
      <div>
        { type === 'view' &&
            <Profile profile={this.props.profile} />
        }
        { type === 'edit' &&
            <EditProfile />
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profile,
    userId: state.account.userId
  }
}

export default connect(mapStateToProps)(UserProfile);
