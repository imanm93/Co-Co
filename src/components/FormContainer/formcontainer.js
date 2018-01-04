import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

class FormContainer extends Component {

  render() {
    return (
      <Grid style={{ height: '100vh' }} verticalAlign='middle' centered >
        <Grid.Column mobile={16} tablet={10} computer={8}>
          {this.props.children}
        </Grid.Column>
      </Grid>
    )
  }
}

export default FormContainer;
