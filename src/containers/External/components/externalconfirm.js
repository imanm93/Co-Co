import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';

class ExternalConfirm extends Component {

  render() {
    return (
      <Grid style={{ backgroundColor: '#FFF', boxShadow: '0 1px 3px 0 #979797' }}>
        <Grid.Column width={16}>
          <Grid.Row style={{ padding: '4em', paddingBottom: '1em' }}>
            <div className='coandco-external-confirm-header'>Thank you for registering!</div>
          </Grid.Row>
          <Grid.Row style={{ padding: '2em 4em', paddingTop: 0, }}>
            <div className='coandco-external-confirm-description'>{this.props.message}</div>
          </Grid.Row>
          <Grid.Row style={{ textAlign: 'center', paddingBottom: '3em' }}>
            <Button circular secondary onClick={() => this.props.redirect()}>{this.props.buttonText}</Button>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    )
  }

}

export default ExternalConfirm;
