import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';

class ExternalConfirm extends Component {

  render() {
    return (
      <Grid style={{ backgroundColor: '#FFF', boxShadow: '0 1px 3px 0 #979797' }}>
        <Grid.Row centered>
          <div>Thank you for registering!</div>
          <br/>
          <div>{this.props.message}</div>
        </Grid.Row>
        <Grid.Row centered>
          <Button circular secondary onClick={() => this.props.redirect()}>{this.props.buttonText}</Button>
        </Grid.Row>
      </Grid>
    )
  }

}

export default ExternalConfirm;
