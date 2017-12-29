import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import DashboardFilters from './dashboardfilters';
import DashboardItems from './dashboarditems';

class DashboardResults extends Component {

  render() {
    return(
      <Grid>
        <Grid.Row>
          <Grid.Column width={5}>
            <DashboardFilters
              filters={this.props.filters}
              setFilterQuery={this.props.setFilterQuery}
            />
          </Grid.Column>
          <Grid.Column width={11}>
            <DashboardItems
              items={this.props.items}
              userId={this.props.userId}
              token={this.props.token}
              isLoading={this.props.isLoading}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

}

export default DashboardResults;
