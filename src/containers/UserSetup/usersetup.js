import React, { Component } from 'react';
import { Dimmer, Loader, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import FormContainer from '../../components/FormContainer';

import UserSkillsForm from './components/userskillsform';
import UserBasicInfoForm from './components/userbasicinfoform';
import UserInterestsForm from './components/userinterestsform';
import UserSignUpReasonsForm from './components/usersignupreasonsform';
import UserProfilePictureForm from './components/userprofilepictureform';

class UserSetup extends Component {

  componentWillMount() {

    this.setState({
      step: 1,
      values: {}
    });
    console.log('setup?');
    if (!this.props.account || this.props.account.token == 0) {
      this.props.history.push("/signin");
    }
    if (this.props.account && this.props.account.profileCompleted) {
      this.props.history.push("/dashboard");
    }

    this.props.fetchTopics(this.props.token);
    this.props.fetchSkills(this.props.token);
    this.props.fetchStreams(this.props.token);
    this.props.fetchCourses(this.props.token);
    this.props.fetchYears(this.props.token);
    this.props.fetchSignUpSources(this.props.token);
    this.props.fetchSignUpReasons(this.props.token);
  }

  onSubmit() {
    const newValues = this.state.values;
    if (!newValues['skillIds']) newValues['skillIds'] = [];
    if (!newValues['interestIds']) newValues['interestIds'] = [];
    if (!newValues['signUpReasonsIds']) newValues['signUpReasonsIds'] = [];
    newValues['groupIds'] = [];
    newValues['staffSchoolId'] = 0;
    newValues['otherName'] = ""; 
    this.props.setupUser(this.props.token, newValues, (response) => { 
      this.props.getUserInfo(this.props.token, (resp) => { 
        this.props.history.push("/dashboard");
      })
    });
  }

  updateSignUpSelection(signUpReasonsIds) {
    this.setState({
      values: Object.assign({}, this.state.values, { signUpReasonsIds: signUpReasonsIds })
    })
  }

  updateTopicSelection(topicIds) {
    this.setState({
      values: Object.assign({}, this.state.values, { interestIds: topicIds })
    });
  }

  updateSkillsSelection(skillIds) {
    this.setState({
      values: Object.assign({}, this.state.values, { skillIds: [...skillIds] })
    });
  }

  updateBasicInfo(info) {
    this.setState({
      values: Object.assign({}, this.state.values, info)
    });
  }

  updateProfilePicture(picture) {
    this.setState({
      values: Object.assign({}, this.state.values, picture)
    });
  }

  onNext() {
    this.setState({
      step: this.state.step + 1
    })
  }

  onPrevious() {
    this.setState({
      step: this.state.step - 1
    })
  }

  render() {
    return (
      <FormContainer>
        {this.props.isSettingUp &&
          <Dimmer active inverted>
            <Loader />
          </Dimmer>
        }
        {this.state.step === 1 &&
          <UserBasicInfoForm
            setupData={this.props.setupData}
            onNext={this.onNext.bind(this)}
            onPrevious={this.onPrevious.bind(this)}
            updateBasicInfo={this.updateBasicInfo.bind(this)}
          />
        }
        {this.state.step === 2 &&
          <UserProfilePictureForm
            onNext={this.onNext.bind(this)}
            onPrevious={this.onPrevious.bind(this)}
            updateProfilePicture={this.updateProfilePicture.bind(this)}
          />
        }
        {this.state.step === 3 &&
          <UserSkillsForm
            skills={this.props.skills}
            streams={this.props.streams}
            onNext={this.onNext.bind(this)}
            onPrevious={this.onPrevious.bind(this)}
            updateSelectedSkills={this.updateSkillsSelection.bind(this)}
          />
        }
        {this.state.step === 4 &&
          <UserInterestsForm
            topicTypes={this.props.topicTypes}
            onNext={this.onNext.bind(this)}
            onPrevious={this.onPrevious.bind(this)}
            updateTopicSelection={this.updateTopicSelection.bind(this)}
            title="Step 4/4: What do you like?"
          />
        }
        {
          this.state.step === 5 &&
          <UserSignUpReasonsForm
            onNext={this.onSubmit.bind(this)}
            onPrevious={this.onPrevious.bind(this)}
            signUpReasons={this.props.setupData.signUpReasons}
            updateSignUpSelection={this.updateSignUpSelection.bind(this)}
            title="And what made you sign up?"
          />
        }
      </FormContainer>
    )
  }

}

function mapStateToProps(state) {
  return {
    setupData: state.setup,
    token: state.account.token,
    skills: state.skills.skills,
    userId: state.account.userId,
    streams: state.skills.streams,
    topicTypes: state.filters.topicTypes,
    isSettingUp: state.loaders.isSettingUp,
    account: state.account
  }
}

export default connect(mapStateToProps, actions)(UserSetup);
