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
    this.props.getUserInfo(this.props.account.token, this.props.account.userId, this.props.history);
  }

  render() {
    return(
      <FormContainer>
        <SignInForm signInUser={this.signInUser} />
      </FormContainer>
    )
  }

}

function mapStateToProps(state) {
  return {
    account: state.account,
    api: state.api
  };
}

export default connect(mapStateToProps, actions)(SignIn);
