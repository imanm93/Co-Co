import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import DashboardFilters from './dashboardfilters';
import DashboardItems from './dashboarditems';

class DashboardResults extends Component {

  render() {
    return(
      <Grid.Column width={14}>
        <Grid.Row centered>
          <Grid>
            <Grid.Column width={4}>
              <DashboardFilters
                filters={this.props.filters}
                currentTab={this.props.currentTab}
                setFilterQuery={this.props.setFilterQuery}
              />
            </Grid.Column>
            <Grid.Column width={11}>
              <DashboardItems
                items={this.props.items}
                userId={this.props.userId}
                name={this.props.name}
                profilePhotoUrl={this.props.profilePhotoUrl}
                token={this.props.token}
                isLoading={this.props.isLoading}
              />
            </Grid.Column>
            <Grid.Column width={1}>
            </Grid.Column>
          </Grid>
        </Grid.Row>
      </Grid.Column>
    )
  }

}

export default DashboardResults;
