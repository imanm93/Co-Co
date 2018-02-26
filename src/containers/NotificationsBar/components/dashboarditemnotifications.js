import React, { Component } from 'react';
import { Grid, Dimmer, Loader } from 'semantic-ui-react';

class DashboardItemNotifications extends Component {

  render() {
    return(
      <div>
        { this.props.loading &&
          <Dimmer active inverted>
            <Loader/>
          </Dimmer>
        }
        { this.props.notifications && this.props.notifications.length > 0 &&
            <div className='dashboard-notifications-primary'>
              <div onClick={() => this.props.redirectToNotifications(this.props.notifications)}>
                <div>
                  <span style={{ fontWeight: 'bold', marginRight: '0.5em' }}>
                    {this.props.notifications.length + ' new opportunities'}
                  </span>
                    matching youre skills & interests
                </div>
              </div>
            </div>
        }
        { (!this.props.notifications || this.props.notifications.length === 0) &&
            <div className='dashboard-notifications-primary-empty'>
              <div onClick={() => this.props.redirectToNotifications(this.props.notifications)}>
                <div>
                  Update your skills to be matched with more opportunities!
                </div>
              </div>
            </div>
        }
      </div>
    )
  }

}

export default DashboardItemNotifications;
