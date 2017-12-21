import React, { Component } from 'react';
import Search from '../../../components/Search';

class DashboardSearchBar extends Component {

  render() {
    return(
      <div>
          <Search items={this.props.skills} />
      </div>
    )
  }

}

export default DashboardSearchBar;
