import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import styles from './external.css';

import PageContainer from '../../components/PageContainer';
import ExternalConfirm from './components/externalconfirm';
import FormContainer from '../../components/FormContainer';
import ExternalPostForm from './components/externalpostform';
import ExternalSignUpForm from './components/externalsignupform';
import ExternalVerifyForm from './components/externalverifyform';

class External extends Component {

  componentWillMount() {
    this.props.fetchSkills(this.props.token);
    this.props.fetchTopics(this.props.token);
    this.props.fetchOppTypes(this.props.token);
    this.props.fetchEventTypes(this.props.token);
  }

  registerExternal(values) {
    this.props.registerExternal(values, (success) => {
      if (success) {
        this.props.history.push('/external/confirm');
      }
    });
  }

  verifyExternal(email) {
    this.props.verifiedExternal(email, (success) => {
      if (success) this.props.history.push('/external/post');
    });
  }

  redirectToHome() {
    this.props.history.push('/');
  }

  redirectToVerify() {
    this.props.history.push('/external/verify');
  }

  redirectToConfirm() {
    this.props.history.push('/external/confirm');
  }

  redirectToPost() {
    this.props.history.push('/external/post');
  }

  redirectToRegister() {
    this.props.history.push('/external/register');
  }

  resetForm() {
    this.props.resetPostItemForm('OppItemForm', this.props.history);
  }

  render() {
    return(
      <PageContainer>
        { this.props.match.params.step === 'register' &&
          <FormContainer>
            <ExternalSignUpForm
              register={this.registerExternal.bind(this)}
              redirectToHome={this.redirectToHome.bind(this)}
              redirectToVerify={this.redirectToVerify.bind(this)}
              isLoadingExternal={this.props.isLoadingExternal}
              registerError={this.props.external.externalFormError}
            />
          </FormContainer>
        }
        { this.props.match.params.step === 'verify' &&
          <FormContainer>
            <ExternalVerifyForm
              verify={this.verifyExternal.bind(this)}
              redirectToPost={this.redirectToPost.bind(this)}
              redirectToRegister={this.redirectToRegister.bind(this)}
              isVerifying={this.props.isVerifying}
              isLoadingExternal={this.props.isLoadingExternal}
              verifyError={this.props.external.externalVerifyFError}
            />
          </FormContainer>
        }
        { this.props.match.params.step === 'post' &&
            <ExternalPostForm
              status={this.props.postItemStatus}
              resetForm={this.resetForm.bind(this)}
              setPostFormTab={this.props.setPostFormTab}
              postError={this.props.external.externalFormError}
              redirect={this.redirectToHome.bind(this)}
              redirectToVerify={this.redirectToVerify.bind(this)}
              externalEmail={this.props.external.externalDetails.contactEmail}
            />
        }
        { this.props.match.params.step === 'confirm' &&
          <FormContainer>
            <ExternalConfirm
              buttonText={'Go back to Homepage'}
              redirect={this.redirectToHome.bind(this)}
              message={`A verification email has been sent. Please click on the link to verify your email.`}
            />
          </FormContainer>
        }
      </PageContainer>
    )
  }

}

function mapStateToProps(state) {
  return {
    form: state.form,
    skills: state.skills,
    filters: state.filters,
    external: state.external,
    token: state.account.token,
    postItemStatus: state.posts.status,
    isLoadingExternal: state.loaders.isLoadingExternal
  }
}

export default connect(mapStateToProps, actions)(External)
