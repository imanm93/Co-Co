import React, { Component } from 'react';
import { Grid, Dimmer, Loader } from 'semantic-ui-react';

class DashboardItemNotifications extends Component {

  // { oppsNotifications && oppsNotifications.length > 0 &&
  //     <div onClick={() => this.redirectToNotifications(eventNotifications)}>
  //       <div>{'You have ' + eventNotifications.length + ' events matching your skills or interests'}</div>
  //     </div>
  //   })
  // }
  // { oppsNotifications && oppsNotifications.length > 0 &&
  //     <div onClick={() => this.redirectToNotifications(oppsNotifications)}>
  //       <div>{'You have ' + oppsNotifications.length + ' opportunities matching your skills or interests'}</div>
  //     </div>
  //   })
  // }


  render() {
    // const eventNotifications = this.props.notifications.filter(n => n.type == 'event');
    // const oppsNotifications = this.props.notifications.filter(n => n.type == 'opportunity');
    return(
      <Grid>
        { this.props.loading &&
          <Dimmer active inverted>
            <Loader/>
          </Dimmer>
        }
        { this.props.notifications && this.props.notifications.length > 0 &&
            <Grid.Row>
              <Grid.Column width={16} onClick={() => this.props.redirectToNotifications(this.props.notifications)}>
                <div>{'You have ' + this.props.notifications.length + ' new opportunities matching youre skills & interests'}</div>
              </Grid.Column>
            </Grid.Row>
        }
      </Grid>
    )
  }

}

export default DashboardItemNotifications;
