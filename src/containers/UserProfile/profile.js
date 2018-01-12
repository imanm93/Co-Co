import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import * as actions from '../../actions/profileActions';

import PageContainer from '../../components/PageContainer';
import NavBar from '../NavBar';
import ViewProfile from './components/viewprofile';
import EditProfileForm from './components/editprofileform';

class Profile extends Component {

  componentWillMount() {
    // if (this.props.profile.profileViewId === this.props.userId) this.props.fetchMyProfile(this.props.token, this.props.userId);
    // if (this.props.profile.profileViewId !== this.props.userId) this.props.fetchProfileData(this.props.token, this.props.profile.profileViewId);
  }

  onConnect(userId) {
    this.props.postConnectFromProfile(this.props.token, userId);
  }

  onEdit() {
    this.props.history.push('/profile/edit');
  }

  render() {
    const type = this.props.match.params.type;
    return (
      <PageContainer>
        <Grid style={{ margin: 0 }}>
          <NavBar history={this.props.history} profilePhotoUrl={this.props.profilePhotoUrl} />
        </Grid>
        { type === 'view' && this.props.userId !== this.props.profile.profileViewId &&
            <ViewProfile
              onEdit={this.onEdit.bind(this)}
              userId={this.props.userId}
              profileViewData={this.props.profile.profileViewData}
            />
        }
        { type === 'view' && this.props.userId === this.props.profile.profileViewId &&
            <ViewProfile
              onEdit={this.onEdit.bind(this)}
              userId={this.props.userId}
              profileViewData={this.props.profile.profileEditData}
            />
        }
        { type === 'edit' && this.props.userId === this.props.profile.profileViewId &&
            <EditProfileForm
              skills={this.props.skills}
              streams={this.props.streams}
              profile={this.props.profile}
              topicTypes={this.props.topicTypes}
              profileViewData={this.props.profile.profileEditData}
            />
        }
      </PageContainer>
    )
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profiles,
    token: state.account.token,
    skills: state.skills.skills,
    userId: state.account.userId,
    streams: state.skills.streams,
    topicTypes: state.filters.topicTypes,
    profilePhotoUrl: state.account.profilePhotoUrl
  }
}

export default connect(mapStateToProps, actions)(Profile);
