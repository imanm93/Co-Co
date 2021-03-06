import React, { Component } from 'react';
import { connect } from 'react-redux';

import SignInForm from './components/signinform';
import * as actions from '../../actions/accountActions';
import FormContainer from '../../components/FormContainer';

class SignIn extends Component {

  signInUser = (credentials) => {
    this.props.postSignInUser(credentials, () => {
      this.getUser();
    });
  }

  getUser = () => {
    this.props.getUserInfo(this.props.account.token, (response) => {
      this.props.history.push("/dashboard");
    });
  }

  render() {
    return(
      <FormContainer>
        <SignInForm signInUser={this.signInUser} signInError={this.props.signInError} isSigningIn={this.props.isSigningIn} />
      </FormContainer>
    )
  }

}

function mapStateToProps(state) {
  return {
    isSigningIn: state.loaders.isAuthenticating,
    signInError: state.errors.signInError,
    account: state.account,
    api: state.api
  };
}

export default connect(mapStateToProps, actions)(SignIn);
