import React, { Component } from 'react';
import { connect } from 'react-redux';

import FormContainer from '../../components/FormContainer';
import * as actions from '../../actions/accountActions';
import ForgotPasswordForm from './components/forgotpasswordform';

class ForgotPassword extends Component {


  onSend = (email) => {
    this.props.forgotPassword(email, this.props.history);
  }

  render() {
    return(
      <FormContainer>
        <ForgotPasswordForm onSend={this.onSend} onBack={this.props.history.goBack} forgotPasswordSuccess={this.props.forgotPasswordSuccess} isSendingForgotPassword={this.props.isSendingForgotPassword} forgotPasswordError={this.props.forgotPasswordError} />
      </FormContainer>
    )
  }
}
function mapStateToProps(state) {
  return {
    isSendingForgotPassword: state.loaders.isSendingForgotPassword,
    forgotPasswordError: state.errors.forgotPasswordError,
    forgotPasswordSuccess : state.success.forgotPasswordSuccess
  }
}
export default connect(mapStateToProps, actions)(ForgotPassword);
