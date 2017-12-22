import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import SearchBox from '../../../components/SearchBox';

class DashboardSearchBar extends Component {

  render() {
    return(
      <div>
          <SearchBox items={this.props.items} setSearchQuery={this.props.setSearchQuery} />
          <Button onClick={() => this.props.followTopic}>Follow Topic</Button>
      </div>
    )
  }

}

export default DashboardSearchBar;
