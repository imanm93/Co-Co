import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

class DashboardItemNotification extends Component {

  getNotificationText() {
    switch(this.props.request.type) {
      case 'opporunity':
        return this.props.notification.length + ' new opportunities';
      case 'events':
        return this.props.notification.length + ' new events';
      default:
        return '';
    }
  }

  render() {
    const notificationTxt = this.getNotificationText();
    return(
      <Grid className='coandco-connection-dash-notification' style={{ margin: 0, borderBottom: '1px solid darkgray', padding: '0em 0.5em' }}>
        <Grid.Column width={9} style={{ padding: '1em 0em' }} onClick={() => this.redirectToNotification(this.props.notification)}>
          <div>{notificationTxt}</div>
        </Grid.Column>
      </Grid>
    )
  }

}

export default DashboardItemNotification;
