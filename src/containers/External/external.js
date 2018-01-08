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
        this.setState({
          redirect: this.redirectToHome.bind(this),
          buttonText: 'Go back to homepage',
          confirmPageMessage: `A verification email has been sent. Please click on the link to verify your email.`
        }, function() {
          this.props.history.push('/external/confirm');
        })
      }
    });
  }

  verifyExternal(email) {
    this.props.verifiedExternal(email, (success) => {
      if (success) this.props.history.push('/external/post');
    });
  }

  postExternal(values) {
    this.props.postExternalItem(values, (success) => {
      this.setState({
        redirect: this.redirectToPost.bind(this),
        buttonText: 'Post another opportunity!',
        confirmPageMessage: `Your opportunity has been posted and targeted to hundreds of students!`
      }, function() {
        this.props.history.push('external/confirm');
      })
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
    this.props.resetPostItemForm('OppItemForm');
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
              post={this.postExternal.bind(this)}
              status={this.props.postItemStatus}
              resetForm={this.resetForm.bind(this)}
              setPostFormTab={this.props.setPostFormTab}
              postError={this.props.external.externalFormError}
              redirect={this.redirectToHome.bind(this)}
              redirectToVerify={this.redirectToVerify.bind(this)}
              externalEmail={this.props.external.externalDetails.contactEmail}
            />
        }
        {
          this.props.match.params.step === 'confirm' && this.state &&
          <FormContainer>
            <ExternalConfirm
            redirect={this.state.redirect}
            message={this.state.confirmPageMessage}
            buttonText={this.state.buttonText}
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
    isLoadingExternal: state.loader.isLoadingExternal
  }
}

export default connect(mapStateToProps, actions)(External)
