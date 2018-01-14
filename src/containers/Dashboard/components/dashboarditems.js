import React, { Component } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import Item from '../../Item';
import Waypoint from 'react-waypoint';

class DashboardItems extends Component {

  render() {
    return (
      <div>
        {
          this.props.isLoading &&
          <Dimmer active inverted>
            <Loader />
          </Dimmer>
        }
        {!this.props.isLoading && this.props.items &&
          Object.keys(this.props.items).map(key => {
            return <Item
              key={String(key)}
              token={this.props.token}
              userId={this.props.userId}
              name={this.props.name}
              profilePhotoUrl={this.props.profilePhotoUrl}
              item={this.props.items[key]}
            />
          })
        }
        {!this.props.isLoading && this.props.items &&
          <Waypoint onEnter={this.props.loadMoreItems} />
        }
      </div>
    )
  }

}

export default DashboardItems;
