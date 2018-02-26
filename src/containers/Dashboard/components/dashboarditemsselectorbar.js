import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';

class DashboardItemsSelectorBar extends Component {

  render() {
    return(
      <Grid columns={3} divided style={{ padding: 0 }}>
        { this.props.tabs && Object.keys(this.props.tabs).map(key => {
            return <Grid.Column key={key} style={{ padding: 0, boxShadow: 'none' }}>
              { this.props.currentTab === this.props.tabs[key] &&
                <Button className="dashboard-item-type-btn active" onClick={() => this.props.onSelected(this.props.tabs[key])}>{this.props.tabs[key]}</Button>
              }
              { this.props.currentTab !== this.props.tabs[key] &&
                <Button className="dashboard-item-type-btn" onClick={() => this.props.onSelected(this.props.tabs[key])}>{this.props.tabs[key]}</Button>
              }
            </Grid.Column>
          })
        }
      </Grid>
    )
  }

}

export default DashboardItemsSelectorBar;
