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
        { this.props.connectionRequests && this.props.connectionRequests.length > 0 && this.props.connectionRequests.map(request => {
            return <ConnectionItemNotification
              request={request}
              key={'connectionitem' + request.userId}
              onRejectConnection={this.props.onRejectConnection}
              onAcceptConnection={this.props.onAcceptConnection}
              onRedirectToOtherProfile={this.props.onRedirectToOtherProfile}
            />
          })
        }
        { (!this.props.connectionRequests || this.props.connectionRequests.length === 0) &&
          <div className='dashboard-notifications-primary-empty'>
            <div>
              <div>
                Refine your profile to attract new connections!
              </div>
            </div>
          </div>
        }
      </div>
    )
  }

}

export default ConnectionItemNotifications;
