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
                onMyConnections={this.props.onMyConnections}
              />
            </Grid.Column>
            <Grid.Column width={12} style={{ paddingTop: '2.5em' }}>
              <DashboardItems
                items={this.props.items}
                userId={this.props.userId}
                name={this.props.name}
                profilePhotoUrl={this.props.profilePhotoUrl}
                token={this.props.token}
                isLoading={this.props.isLoading}
                loadMoreItems={this.props.loadMoreItems}
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
