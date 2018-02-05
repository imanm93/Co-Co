import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/accountActions';
import { Grid, Button, Dimmer, Loader } from 'semantic-ui-react';

import FormContainer from '../../components/FormContainer';

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
      <FormContainer>
        <Grid className='coandco-post-form-container' style={{ padding: '2rem' }}>
          {this.props.isResendingEmail &&
            <Dimmer active inverted>
              <Loader />
            </Dimmer>
          }
          <Grid.Row centered style={{ fontSize: '33px', fontWeight: '600' }}>Thank you</Grid.Row>
          <Grid.Row centered>You're now signed up.</Grid.Row>
          <Grid.Row centered>
            {/* <Button circular style={{
              backgroundColor: '#FFF',
              border: '1px solid #2A2A2A',
              color: '#2A2A2A'
            }}
            disabled={this.props.isResendingEmail}
            onClick={this.resendVerificationEmail.bind(this)}
            as='a'>
              resend email
            </Button> */}
            <Button circular secondary onClick={this.redirectToLogin}>Sign in!</Button>
          </Grid.Row>
          <Grid.Row>
            {this.props.emailSent &&
              <div>The email has been sent successfuly</div>
            }
          </Grid.Row>
        </Grid>
      </FormContainer>
    )
  }

}

function mapStateToProps(state) {
  return {
    isResendingEmail: state.verify.isResendingEmail,
    verifyUserEmail: state.verify.email,
    emailError: state.verify.emailError,
    verifyUserId: state.verify.userId,
    emailSent: state.verify.emailSent,
  }
}

export default connect(mapStateToProps,actions)(Verify);
