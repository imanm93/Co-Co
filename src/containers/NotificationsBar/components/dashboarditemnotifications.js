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
    return(
      <Grid>
        { this.props.loading &&
          <Dimmer active inverted>
            <Loader/>
          </Dimmer>
        }
        { this.props.notifications && this.props.notifications.length > 0 &&
            <Grid.Row>
              <Grid.Column width={14} onClick={() => this.props.redirectToNotifications(this.props.notifications)} style={{
                  backgroundColor: 'rgb(42, 42, 42)',
                  borderTopRightRadius: '13px',
                  borderTopLeftRadius: '13px',
                  border: '1px solid #FFF',
                  textAlign: 'center',
                  marginTop: '-0.4em',
                  borderBottom: 'none',
                  padding: '0.5em'
               }}>
                <div style={{ color: '#FFF' }}>
                  <span style={{ fontWeight: 'bold' }}>
                    Notification Center
                  </span>
                </div>
              </Grid.Column>
              <Grid.Column width={14} onClick={() => this.props.redirectToNotifications(this.props.notifications)} style={{
                  backgroundColor: 'rgb(243,139,61)',
                  borderRight: '1px solid #FFF',
                  borderLeft: '1px solid #FFF',
                  padding: '0.7em'
               }}>
                <div style={{ color: '#FFF' }}>
                  <span style={{ fontWeight: 'bold', marginRight: '0.5em' }}>
                    {this.props.notifications.length + ' new opportunities'}
                  </span>
                    matching youre skills & interests
                </div>
              </Grid.Column>
            </Grid.Row>
        }
      </Grid>
    )
  }

}

export default DashboardItemNotifications;
