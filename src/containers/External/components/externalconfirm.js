import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from 'semantic-ui-react';

class ExternalConfirm extends Component {

  render() {
    const { match, history } = this.props;
    return (
      <Grid style={{ margin: 0 }}>
        <div>
          <div>Thank you</div>
          <div>{this.props.message}</div>
        </div>
        <div>
          <Button onClick={() => this.props.redirect()}>{this.props.buttonText}</Button>
        </div>
      </Grid>
    )
  }

}

export default ExternalConfirm;
