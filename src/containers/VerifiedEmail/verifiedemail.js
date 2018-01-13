import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Grid, Button } from 'semantic-ui-react';
import FormContainer from '../../components/FormContainer';

class VerifiedEmail extends Component {

  redirectToSignIn() {
    this.props.history.push('/signin');
  }

  render() {
    return(
      <FormContainer>
        <Grid className='coandco-post-form-container' style={{ padding: '2rem' }}>
          <Grid.Row centered>
            <div style={{ fontSize: '25px', fontWeight: 600 }}>
              Your email has been verified!<br/><br/>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam molestie posuere ante. In viverra diam eu interdum mollis. Suspendisse non tortor eget dui placerat feugiat a eu dui. 
            </div>
          </Grid.Row>
          <Grid.Row centered>
            <Button circular secondary onClick={() => this.redirectToSignIn()}>Lorem ipsum dolor!</Button>
          </Grid.Row>
        </Grid>
      </FormContainer>
    )
  }

}

export default connect()(VerifiedEmail);
