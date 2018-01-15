import React, { Component } from 'react';
import { Grid, Dimmer, Loader } from 'semantic-ui-react';
import Item from '../../Item';
import Waypoint from 'react-waypoint';

class DashboardItems extends Component {

  render() {
    return (
      <div>
        { this.props.isLoading &&
          <Grid style={{ wdith: '100%' }}>
              <Loader active inline='centered'/>
          </Grid>
        }
        { !this.props.isLoading && this.props.items &&
          Object.keys(this.props.items).map(key => {
            return <Item
              key={String(key)}
              token={this.props.token}
              userId={this.props.userId}
              name={this.props.name}
              profilePhotoUrl={this.props.profilePhotoUrl}
              item={this.props.items[key]}
              history={this.props.history}
            />
          })
        }
        { this.props.isLoadingMoreItems && !this.props.isLoading &&
          <Grid style={{ wdith: '100%' }}>
              <Loader active inline='centered'/>
          </Grid>
        }
        { !this.props.isMyConnections && !this.props.isLoading && !this.props.isLoadingMoreItems && this.props.tab === 'People' && this.props.items && Object.keys(this.props.items).length > 10 &&
          <Grid style={{ wdith: '100%' }}>
            <Waypoint onEnter={this.props.onLoadMoreItems} />
          </Grid>
        }
        { !this.props.isMyConnections && !this.props.isLoading && !this.props.isLoadingMoreItems && this.props.tab !== 'People' && this.props.items && Object.keys(this.props.items).length > 5 &&
          <Grid style={{ wdith: '100%' }}>
            <Waypoint onEnter={this.props.onLoadMoreItems} />
          </Grid>
        }
      </div>
    )
  }

}

export default DashboardItems;
