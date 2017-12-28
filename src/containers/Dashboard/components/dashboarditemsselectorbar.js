import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

class DashboardItemsSelectorBar extends Component {

  render() {
    return(
      <div>
        { this.props.tabs && Object.keys(this.props.tabs).map(key => {
            return <Button key={key} onClick={() => this.props.onSelected(this.props.tabs[key])}>{this.props.tabs[key]}</Button>
          })
        }
      </div>
    )
  }

}

export default DashboardItemsSelectorBar;
