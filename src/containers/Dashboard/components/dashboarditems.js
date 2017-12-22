import React, { Component } from 'react';
import Item from '../../Item';

class DashboardItems extends Component {

  render() {
    return(
      <div>
        { this.props.items &&
            Object.keys(this.props.items).map(key => {
              return <Item key={key} item={this.props.items[key]} userId={this.props.userId} />
            })
        }
      </div>
    )
  }

}

export default DashboardItems;
