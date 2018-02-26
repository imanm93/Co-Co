import React, { Component } from 'react';
import { Grid, Image, Button, Label } from 'semantic-ui-react';

class ConnectionItemNotification extends Component {

  render() {
    return(
      <div className='connection-notifications-primary' onClick={() => this.props.onRedirectToOtherProfile(this.props.request.userId)}>
        <Image avatar style={{ marginLeft: '0.5em' }} src={this.props.request.profilePhotoUrl} />
        <div style={{ display: 'inline-block', padding: '1em' }}>
          <div style={{ fontWeight: 600 }}>{this.props.request.firstName} {this.props.request.lastName}</div>
          <div style={{ fontSize: '12px' }}>{this.props.request.courseName}</div>
        </div>
        { !this.props.request.status &&
          <div style={{ display: 'inline-block', padding: '1em' }}>
            <i className='fa fa-chevron-right'></i>
          </div>
        }
        { this.props.request.status === 'connected' &&
          <div style={{ display: 'inline-block', padding: '1em 0.5em' }}>
            <Label>Accepted</Label>
          </div>
        }
        { this.props.request.status === 'initial' &&
          <div style={{ display: 'inline-block', padding: '1em 0.5em' }}>
            <Label>Rejected</Label>
          </div>
        }
        { /* (!this.props.request.status || this.props.request.status === 'default') &&
          <Grid.Column width={1} style={{ padding: '1em 0em' }}>
            <Button
              style={{ backgroundColor: 'transparent', border: '1px solid darkgray', borderRadius: '50%', padding: '0em', width: '2em', height: '2em' }}
              onClick={() => this.props.onAcceptConnection(this.props.request.userId)}>
                <i className='fa fa-check'></i>
            </Button>
          </Grid.Column> */
        }
        { /* (!this.props.request.status || this.props.request.status === 'default') &&
          <Grid.Column width={1}>
            <Button
              style={{ backgroundColor: 'transparent', border: '1px solid darkgray', borderRadius: '50%', padding: '0em', width: '2em', height: '2em' }}
              onClick={() => this.props.onRejectConnection(this.props.request.userId)}>
                <i className='fa fa-times'></i>
            </Button>
          </Grid.Column> */
        }
        { /* this.props.request.error &&
          <Grid.Column width={16} style={{ textAlign: 'center' }}>
            {this.props.request.error}
          </Grid.Column> */
        }
      </div>
    )
  }

}

export default ConnectionItemNotification;
