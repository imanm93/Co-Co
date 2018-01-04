import React, { Component } from 'react';
import { connect } from 'react-redux';

class VerifiedEmail extends Component {

  redirectToSignIn() {
    this.props.history.push('/signin');
  }

  render() {
    return(
      <div>
        This is verified email
      </div>
    )
  }

}

export default connect()(VerifiedEmail);
