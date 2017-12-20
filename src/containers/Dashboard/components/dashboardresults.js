import React, { Component } from 'react';
import DashboardFilters from './dashboardfilters';
import DashboardItems from './dashboarditems';

class DashboardResults extends Component {

  render() {
    return(
      <div>
        <DashboardFilters />
        <hr/>
        <DashboardItems items={this.props.items} />
      </div>
    )
  }

}

export default DashboardResults;
