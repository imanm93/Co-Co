import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from 'semantic-ui-react';
import * as actions from '../../actions/externalActions';
import FormContainer from '../../components/FormContainer';

class VerifiedCompany extends Component {

  getExternalCompany(email) {
    this.props.verifiedExternal({ email: email }, (success) => {
      if (success) { /*Do Nothing*/ }
      else { /*Show some error */ }
    });
  }

  redirectToExternalPost() {
    this.props.history.push('/external/post');
  }

  render() {
    const email = this.props.location.pathname.split("/")[2];
    this.getExternalCompany(email);
    return(
      <FormContainer>
        <Grid className='coandco-post-form-container' style={{ padding: '2rem' }}>
          <Grid.Row centered>
            <div style={{ fontSize: '25px', fontWeight: 600 }}>
              Your email has been verified!<br/><br/>
              You can now post opportunities to hundreds of students in our community.
            </div>
          </Grid.Row>
          <Grid.Row centered>
            <Button circular secondary onClick={() => this.redirectToExternalPost()}>Go Post!</Button>
          </Grid.Row>
        </Grid>
      </FormContainer>
    )
  }

}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps, actions)(VerifiedCompany);
