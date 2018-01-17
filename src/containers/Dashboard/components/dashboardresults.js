import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import DashboardItems from './dashboarditems';
import DashboardFilters from './dashboardfilters';

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
                isMyConnections={this.props.isMyConnections}
              />
            </Grid.Column>
            <Grid.Column width={12} style={{ paddingTop: '2.5em' }}>
              <DashboardItems
                name={this.props.name}
                items={this.props.items}
                token={this.props.token}
                userId={this.props.userId}
                tab={this.props.currentTab}
                history={this.props.history}
                isLoading={this.props.isLoading}
                profilePhotoUrl={this.props.profilePhotoUrl}
                isMyConnections={this.props.isMyConnections}
                onLoadMoreItems={this.props.onLoadMoreItems}
                canLoadMoreItems={this.props.canLoadMoreItems}
                isLoadingMoreItems={this.props.isLoadingMoreItems}
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
