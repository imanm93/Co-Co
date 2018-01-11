import React, { Component } from 'react';
import styles from '../notificationsbar.css';
import { Dimmer, Loader } from 'semantic-ui-react';
import ConnectionItemNotification from '../../../components/ConnectionItemNotification';

class ConnectionItemNotifications extends Component {

  render() {
    return(
      <div>
        {
          this.props.loading &&
            <Dimmer active inverted>
              <Loader/>
            </Dimmer>
        }
        <div style={{
          color: '#FFF',
          fontWeight: 600,
          textAlign: 'center',
          padding: '0.5em 0em',
          backgroundColor: '#2A2A',
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          borderBottom: '1px solid darkgray'
        }}>
          {this.props.connectionRequests.length + ' new people want to connect!'}
        </div>
        {
          this.props.connectionRequests && this.props.connectionRequests.map(request => {
            return <ConnectionItemNotification
              key={'connectionitem' + request.userId}
              request={request}
              onRejectConnection={this.props.onRejectConnection}
              onAcceptConnection={this.props.onAcceptConnection}
            />
          })
        }
      </div>
    )
  }

}

export default ConnectionItemNotifications;
