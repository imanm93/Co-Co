import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import SignInForm from './components/signinform';

class SignIn extends Component {

  signInUser = (credentials) => {
    this.props.postSignInUser(credentials, this);
  }

  render() {
    return(
      <div>
        <SignInForm signInUser={this.signInUser} />
      </div>
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
