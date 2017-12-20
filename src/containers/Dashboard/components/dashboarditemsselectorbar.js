import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

class DashboardItemsSelectorBar extends Component {

  render() {
    return(
      <div>
        <Button>All Results</Button>
        <Button>Opporunitites</Button>
        <Button>People</Button>
        <Button>Events</Button>
        <Button>Posts</Button>
      </div>
    )
  }

}

export default DashboardItemsSelectorBar;
