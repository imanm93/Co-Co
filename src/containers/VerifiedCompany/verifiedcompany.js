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
        <Grid>
          <Grid.Row>
            Your email has been verified! You can now post opportunities ...
          </Grid.Row>
          <Grid.Row>
            <Button onClick={() => this.redirectToExternalPost()}>Go Post!</Button>
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
