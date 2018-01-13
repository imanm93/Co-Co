import React, { Component } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import FilterBox from '../../../components/FilterBox';

class DashboardSearchBar extends Component {

  render() {
    return(
      <Grid.Row style={{ backgroundColor: '#2A2A2A' }}>
        <Grid.Column width={16} style={{ textAlign: 'center' }}>
          <FilterBox
            items={this.props.items}
            className='dashboard-search'
            placeholder='What are you looking for?'
            setSearchQuery={this.props.setSearchQuery}
          />
        </Grid.Column>
      </Grid.Row>
    )
  }

}

export default DashboardSearchBar;
