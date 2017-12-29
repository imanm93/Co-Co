import React, { Component } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import SearchBox from '../../../components/SearchBox';

class DashboardSearchBar extends Component {

  render() {
    return(
      <Grid>
          <Grid.Row>
            <Grid.Column width={12}>
              <SearchBox items={this.props.items} setSearchQuery={this.props.setSearchQuery} />
            </Grid.Column>
            <Grid.Column width={4}>
              <Button onClick={() => this.props.onFollowTopic}>Follow Topic</Button>
            </Grid.Column>
          </Grid.Row>
      </Grid>
    )
  }

}

export default DashboardSearchBar;
