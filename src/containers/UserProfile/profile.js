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
    if (this.props.profile.profileViewId) this.props.fetchProfileData(this.props.token, this.props.profile.profileViewId);
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
        { type === 'view' &&
            <ViewProfile
              onEdit={this.onEdit.bind(this)}
              userId={this.props.userId}
              profileViewData={this.props.profile.profileViewData}
            />
        }
        { type === 'edit' && this.props.userId === this.props.profile.profileViewId &&
            <EditProfileForm
              skills={this.props.skills}
              streams={this.props.streams}
              profile={this.props.profile}
              topicTypes={this.props.topicTypes}
              profileViewData={this.props.profile.profileViewData}
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
    profilePhotoUrl: state.account.profilePhotoUrl,
    streams: state.skills.streams,
    topicTypes: state.filters.topicTypes
  }
}

export default connect(mapStateToProps, actions)(Profile);
