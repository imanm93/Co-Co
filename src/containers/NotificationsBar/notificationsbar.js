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
    this.props.postAcceptConnection(this.props.token, userId);
  }

  onRejectConnection(userId) {
    this.props.postRejectConnection(this.props.token, userId);
  }

  render() {
    return(
      <Grid.Row>
        <Grid style={{ margin: 0 }}>
          <Grid.Column width={14}>
          </Grid.Column>
          <Grid.Column width={1}>
            <Popup
              trigger={
                <div>
                  <Icon style={{ fontSize: '22px' }} name='user plus' />
                  <Label color='red' circular floating style={{ top: '0.2em', fontSize: '10px', textAlign: 'center' }}>
                    {this.props.connectionRequests.length}
                  </Label>
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
                  <Icon style={{ fontSize: '22px' }} name='bell' />
                  <Label color='red' circular floating style={{ top: '0.2em', fontSize: '10px', textAlign: 'center' }}>
                    {this.props.notifications.length}
                  </Label>
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
  return {
    isLoadingNotifications: state.loaders.isLoadingNotifications,
    isLoadingConnections: state.loaders.isLoadingConnections,
    notifications: state.notifications.notifications,
    connectionRequests: state.connections.requests
  }
}

export default connect(mapStateToProps, actions)(NotificationsBar);
