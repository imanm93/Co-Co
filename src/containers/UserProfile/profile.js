import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import * as actions from '../../actions/profileActions';

import PageContainer from '../../components/PageContainer';
import NavBar from '../NavBar';
import ViewProfile from './components/viewprofile';
import EditProfileForm from './components/editprofileform';
import portfolioLinkItems from '../../constants/portfolioLinkItems/portfolioLinkItems';

class Profile extends Component {

  componentWillMount() {
    console.log(this.props);
  }
  refresh(profileId) {
    if (profileId === this.props.userId) {
      this.props.fetchMyProfile(this.props.token, this.props.userId);
    }
    if (profileId !== this.props.userId) {
      this.props.fetchProfileData(this.props.token, this.props.userId);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profileViewId !== this.props.profile.profileViewId) {
      this.refresh(nextProps.profile.profileViewId);
    }
  }

  onConnect(userId) {
    this.props.postConnectFromProfile(this.props.token, userId);
  }

  onSaveProfile(values) {
    this.props.putUserProfile(this.props.token, values);
  }

  render() {
    console.log(this.props.profile);
    const type = this.props.match.params.type;
    return (
      <PageContainer>
        <Grid style={{ margin: 0 }}>
          <NavBar history={this.props.history} profilePhotoUrl={this.props.profilePhotoUrl} />
        </Grid>
        {type === 'view' &&
          <ViewProfile
            userId={this.props.userId}
            skills={this.props.skills}
            topics={this.props.topicTypes}
            profileViewData={this.props.profile.profileViewData}
          />
        }
        {type === 'edit' && this.props.userId === this.props.profile.profileViewId &&
          <EditProfileForm
            skills={this.props.skills}
            streams={this.props.streams}
            profile={this.props.profile}
            topicTypes={this.props.topicTypes}
            profileEditData={this.props.profile.profileViewData}
            initialValues={this.props.profile.profileViewData}
            onSaveProfile={this.onSaveProfile.bind(this)}
            portfolioLinkItems={portfolioLinkItems}
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
