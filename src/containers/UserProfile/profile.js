import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import * as actions from '../../actions/profileActions';
import Utils from '../../utils';

import PageContainer from '../../components/PageContainer';
import NavBar from '../NavBar';
import ViewProfile from './components/viewprofile';
import EditProfileForm from './components/editprofileform';
import portfolioLinkItems from '../../constants/portfolioLinkItems/portfolioLinkItems';

class Profile extends Component {

  refresh(profileId) {
    if (profileId === this.props.userId) { this.props.fetchMyProfile(this.props.token, this.props.userId); }
    if (profileId !== this.props.userId) { this.props.fetchProfileData(this.props.token, this.props.profile.profileViewId); }
  }

  componentWillMount() {
    this.refresh(this.props.profile.profileViewId);
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
    values['profileComplete'] = true;
    this.props.putUserProfile(this.props.token, values, this.props.userId, this.props.history);
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
            userId={this.props.userId}
            skills={this.props.skills}
            topics={this.props.topicTypes}
            onConnect={this.onConnect.bind(this)}
            isLoadingProfile={this.props.isLoadingProfile}
            profileViewData={this.props.profile.profileViewData}
          />
        }
        { type === 'view' && this.props.userId === this.props.profile.profileViewId &&
          <ViewProfile
            userId={this.props.userId}
            skills={this.props.skills}
            topics={this.props.topicTypes}
            isLoadingProfile={this.props.isLoadingProfile}
            profileViewData={this.props.profile.profileEditData}
          />
        }
        { type === 'edit' && this.props.userId === this.props.profile.profileViewId &&
          <EditProfileForm
            skills={this.props.skills}
            streams={this.props.streams}
            profile={this.props.profile}
            topicTypes={this.props.topicTypes}
            isSavingProfile={this.props.isSavingProfile}
            isLoadingProfile={this.props.isLoadingProfile}
            profileEditData={this.props.profile.profileEditData}
            initialValues={this.props.profile.profileEditData}
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
    api: state.api,
    profile: state.profiles,
    token: state.account.token,
    skills: state.skills.skills,
    userId: state.account.userId,
    streams: state.skills.streams,
    topicTypes: state.filters.topicTypes,
    profilePhotoUrl: state.account.profilePhotoUrl,
    isSavingProfile: state.loaders.isSavingProfile,
    isLoadingProfile: state.loaders.isLoadingProfile
  }
}

export default connect(mapStateToProps, actions)(Profile);
