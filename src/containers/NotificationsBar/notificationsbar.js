import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Popup, Icon, Label } from 'semantic-ui-react';
import * as actions from '../../actions/notificationBarActions';

import ConnectionItemNotifications from './components/connectionitemnotifications';
import DashboardItemNotifications from './components/dashboarditemnotifications';

class NotificationsBar extends Component {

  componentWillMount() {
    this.props.fetchConnectionRequests(this.props.token);
  }

  getNotifications() {
    this.props.fetchNotifications(this.props.token);
  }

  onAcceptConnection(userId) {
    console.log('Accepting', userId);
  }

  onRejectConnection(userId) {
    console.log('Rejecting', userId);
  }

  render() {
    return(
      <Grid.Row>
        <Grid style={{ margin: 0 }}>
          <Grid.Column width={1}>
            <Popup
              trigger={
                <div>
                  <Icon style={{ fontSize: '17px' }} name='user plus' />
                  {this.props.connectionRequests.length > 0 && <Label color='red' circular floating style={{ top: '0.2em', fontSize: '10px', textAlign: 'center' }}>
                    {this.props.connectionRequests.length == 0}
                  </Label>}
                </div>
              }
              content={<ConnectionItemNotifications
                loading={this.props.isLoadingConnections}
                connectionRequests={this.props.connectionRequests}
                onRejectConnection={this.onRejectConnection.bind(this)}
                onAcceptConnection={this.onAcceptConnection.bind(this)}
              />}
              style={{ padding: 0 }}
              hideOnScroll={true}
              on='click'
              position='bottom center'
            />
          </Grid.Column>
          <Grid.Column width={1}>
            <Popup
              hideOnScroll={true}
              on='click'
              position='bottom center'
              onOpen={this.getNotifications.bind(this)}
              trigger={
                <div>
                  <Icon name='bell' />
                  {
                    this.props.notifications.length > 0 &&                  
                    <Label color='red' circular floating style={{ top: '0.2em', fontSize: '10px', textAlign: 'center' }}>
                      {this.props.notifications.length}
                    </Label>
                  }
                </div>
              }
              content={<DashboardItemNotifications loading={this.props.isLoadingNotifications} notifications={this.props.notifications}/>}
            />
          </Grid.Column>
        </Grid>
      </Grid.Row>
    )
  }

}

function mapStateToProps(state) {
  console.log(state.connections.requests);
  return {
    isLoadingNotifications: state.loaders.isLoadingNotifications,
    isLoadingConnections: state.loaders.isLoadingConnections,
    notifications: state.notifications.notifications,
    connectionRequests: state.connections.requests
  }
}

export default connect(mapStateToProps, actions)(NotificationsBar);
