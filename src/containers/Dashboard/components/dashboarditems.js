import React, { Component } from 'react';
import Item from '../../Item';
import Waypoint from 'react-waypoint';
import { Grid, Dimmer, Loader } from 'semantic-ui-react';

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
              name={this.props.name}
              token={this.props.token}
              userId={this.props.userId}
              item={this.props.items[key]}
              history={this.props.history}
              profilePhotoUrl={this.props.profilePhotoUrl}
            />
          })
        }
        { this.props.isLoadingMoreItems && !this.props.isLoading &&
          <Grid style={{ wdith: '100%' }}>
              <Loader active inline='centered'/>
          </Grid>
        }
        { !this.props.isMyConnections && !this.props.isLoading && !this.props.isLoadingMoreItems && this.props.canLoadMoreItems &&
          <Grid style={{ wdith: '100%' }}>
            <Waypoint onEnter={this.props.onLoadMoreItems} />
          </Grid>
        }
      </div>
    )
  }

}

// {
//   // !this.props.isMyConnections && !this.props.isLoading && !this.props.isLoadingMoreItems && this.props.tab !== 'People' && this.props.items &&
//   // !this.props.items && Object.keys(this.props.items).length !== 0 && this.props.items && Object.keys(this.props.items).length > 5 &&
//   // <Grid style={{ wdith: '100%' }}>
//   //   <Waypoint onEnter={this.props.onLoadMoreItems} />
//   // </Grid>
// }

export default DashboardItems;
