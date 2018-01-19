import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Popup, Icon, Label } from 'semantic-ui-react';
import * as actions from '../../actions/notificationBarActions';

import ConnectionItemNotifications from './components/connectionitemnotifications';
import DashboardItemNotifications from './components/dashboarditemnotifications';

class NotificationsBar extends Component {

  componentWillMount() {
    this.props.fetchConnectionRequests(this.props.token);
    this.props.fetchNotifications(this.props.token);
  }

  onAcceptConnection(userId) {
    this.props.postAcceptConnection(this.props.token, userId);
  }

  onRejectConnection(userId) {
    this.props.postRejectConnection(this.props.token, userId);
  }

  redirectToNotification(notifications) {
    const ids = notifications.map(n => n.itemId).join(',');
    this.props.history.push('/view/items/' + ids);
  }

  render() {
    return(
      <Grid.Row>
        <Grid style={{ margin: 0 }}>
          <Grid.Column width={14}>
          </Grid.Column>
          <Grid.Column width={1}>
            {/*<Popup
              trigger={
                <div>
                  <Icon style={{ fontSize: '22px' }} name='user plus' />
                  {this.props.connectionRequests && this.props.connectionRequests.length > 0 &&
                    <Label color='red' circular floating style={{ top: '0.2em', fontSize: '10px', textAlign: 'center' }}>
                      {this.props.connectionRequests.length}
                    </Label>
                  }
                </div>
              }
              content={<ConnectionItemNotifications
                loading={this.props.isLoadingConnections}
                connectionRequests={this.props.connectionRequests}
                onAcceptConnection={this.onAcceptConnection.bind(this)}
                onRejectConnection={this.onRejectConnection.bind(this)}
              />}
              style={{ padding: 0 }}
              hideOnScroll={true}
              on='click'
              position='bottom center'
            />*/}
          </Grid.Column>
          <Grid.Column width={1}>
            {/*}<Popup
              trigger={
                <div>
                  <Icon style={{ fontSize: '22px' }} name='bell' />
                  {
                    this.props.dashItemNotifications && this.props.dashItemNotifications.length > 0 &&
                    <Label color='red' circular floating style={{ top: '0.2em', fontSize: '10px', textAlign: 'center' }}>
                      {this.props.dashItemNotifications.length}
                    </Label>
                  }
                </div>
              }
              content={<DashboardItemNotifications
                loading={this.props.isLoadingNotifications}
                notifications={this.props.dashItemNotifications}
                redirectToNotifications={this.redirectToNotification.bind(this)}
              />}
              style={{ padding: 0 }}
              hideOnScroll={true}
              on='click'
              position='bottom center'
            />*/}
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
    dashItemNotifications: state.notifications.dashItemNotifications,
    connectionRequests: state.connections.requests
  }
}

export default connect(mapStateToProps, actions)(NotificationsBar);
