import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/accountActions';
import { Grid, Button, Dimmer, Loader } from 'semantic-ui-react';

class Verify extends Component {

  resendVerificationEmail() {
    this.props.resendVerificationEmail(this.props.verifyUserId);
  }

  redirectToLogin = () =>{
    this.props.history.push("signin");
  }

  render() {
    const { match, history } = this.props;
    return (
      <Grid style={{ margin: 0 }}>
        <div>
          {this.props.isResendingEmail &&
            <Dimmer active inverted>
              <Loader />
            </Dimmer>
          }
          <div>Thank you</div>
          <div>a verification email has been sent to {this.props.verifyUserEmail}</div>
          <div>
            <Button disabled={this.props.isResendingEmail} onClick={this.resendVerificationEmail.bind(this)} as='a'>resend email</Button>
            <Button onClick={this.redirectToLogin}>Sign in!</Button>
          </div>
          <div>
            {this.props.emailSent &&
              <div>The email has been sent successfuly</div>
            }
          </div>
        </div>
      </Grid>
    )
  }

}

function mapStateToProps(state) {
  return {
    isResendingEmail: state.verify.isResendingEmail,
    verifyUserId: state.verify.userId,
    verifyUserEmail: state.verify.email,
    emailSent: state.verify.emailSent,
    emailError: state.verify.emailError
  }
}

export default connect(mapStateToProps,actions)(Verify);
