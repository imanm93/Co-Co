import React, { Component } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import SearchBox from '../../../components/SearchBox';

class DashboardSearchBar extends Component {

  render() {
    return(
      <Grid style={{ backgroundColor: '#292F2E', width: '70.25%' }}>
          <Grid.Row style={{ marginBottom: '1rem' }}>
            <Grid.Column width={16} style={{ textAlign: 'center' }}>
              <SearchBox items={this.props.items} placeholder='What are you looking for?' setSearchQuery={this.props.setSearchQuery} />
            </Grid.Column>
          </Grid.Row>
      </Grid>
    )
  }

  // <Grid.Column width={6} style={{ textAlign: 'right' }}>
  //   <Button className="dashboard-btn-follow-topic" onClick={() => this.props.onFollowTopic}>Follow Topic</Button>
  // </Grid.Column>

}

export default DashboardSearchBar;
