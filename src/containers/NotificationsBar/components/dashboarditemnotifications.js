import React, { Component } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import DashboardItemNotification from '../../../components/DashboardItemNotification';

class DashboardItemNotifications extends Component {

  render() {
    console.log(this.props.loading);
    return(
      <div>
        { this.props.loading &&
          <Dimmer active inverted>
            <Loader/>
          </Dimmer>
        }
        { this.props.notifications.map((notification, index) => {
            return <DashboardItemNotification
              key={'notificationitem' + index}
              notification={notification}
            />
          })
        }
      </div>
    )
  }

}

export default DashboardItemNotifications;
