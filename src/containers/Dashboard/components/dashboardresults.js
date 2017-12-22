import React, { Component } from 'react';
import DashboardFilters from './dashboardfilters';
import DashboardItems from './dashboarditems';

class DashboardResults extends Component {

  render() {
    return(
      <div>
        <DashboardFilters filters={this.props.filters} setFilterQuery={this.props.setFilterQuery} />
        <hr/>
        <DashboardItems items={this.props.items} userId={this.props.userId} />
      </div>
    )
  }

}

export default DashboardResults;
