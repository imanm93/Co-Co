import React, { Component } from 'react';
import { Grid, Image, Button, Label } from 'semantic-ui-react';

class ConnectionItemNotification extends Component {

  render() {
    return(
      <Grid className='coandco-connection-request-notification' style={{ margin: 0, borderBottom: '1px solid darkgray', padding: '0em 0.5em' }}>
        <Grid.Column width={3} style={{ padding: '1.25em 0em' }}>
          <Image avatar src={this.props.request.profilePhotoUrl} />
        </Grid.Column>
        <Grid.Column width={9} style={{ padding: '1em 0em' }}>
          <div style={{ fontWeight: 600 }}>{this.props.request.firstName} {this.props.request.lastName}</div>
          <div style={{ fontSize: '12px' }}>{this.props.request.courseName}</div>
        </Grid.Column>
        { this.props.request.status === 'accepted' &&
          <Grid.Column width={2} style={{ padding: '1em 0em' }}>
            <Label>Accepted</Label>
          </Grid.Column>
        }
        { this.props.request.status === 'rejected' &&
          <Grid.Column width={2} style={{ padding: '1em 0em' }}>
            <Label>Rejected</Label>
          </Grid.Column>
        }
        { (!this.props.request.status || this.props.request.status === 'default') &&
          <Grid.Column width={1} style={{ padding: '1em 0em' }}>
            <Button
              style={{ backgroundColor: 'transparent', border: '1px solid darkgray', borderRadius: '50%', padding: '0em', width: '2em', height: '2em' }}
              onClick={() => this.props.onAcceptConnection(this.props.request.userId)}>
                <i className='fa fa-check'></i>
            </Button>
          </Grid.Column>
        }
        { (!this.props.request.status || this.props.request.status === 'default') &&
          <Grid.Column width={1}>
            <Button
              style={{ backgroundColor: 'transparent', border: '1px solid darkgray', borderRadius: '50%', padding: '0em', width: '2em', height: '2em' }}
              onClick={() => this.props.onRejectConnection(this.props.request.userId)}>
                <i className='fa fa-times'></i>
            </Button>
          </Grid.Column>
        }
        { this.props.request.error &&
          <Grid.Column width={16} style={{ textAlign: 'center' }}>
            {this.props.request.error}
          </Grid.Column>
        }
      </Grid>
    )
  }

}

export default ConnectionItemNotification;
