import React, { Component } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import SearchBox from '../../../components/SearchBox';

class DashboardSearchBar extends Component {

  render() {
    return(
      <Grid.Row style={{ backgroundColor: '#2A2A2A' }}>
        <Grid.Column width={16} style={{ textAlign: 'center' }}>
          <SearchBox items={this.props.items} placeholder='What are you looking for?' setSearchQuery={this.props.setSearchQuery} />
        </Grid.Column>
      </Grid.Row>
    )
  }

  // <Grid.Column width={6} style={{ textAlign: 'right' }}>
  //   <Button className="dashboard-btn-follow-topic" onClick={() => this.props.onFollowTopic}>Follow Topic</Button>
  // </Grid.Column>

}

export default DashboardSearchBar;
