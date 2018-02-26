import React, { Component } from 'react';
import * as actions from '../../actions';
import { connect, } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import DashboardItems from '../Dashboard/components/dashboarditems';
import PageContainer from '../../components/PageContainer';
import NavBar from '../NavBar';

class ViewSpecificItems extends Component {

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    let itemsIds = this.props.match.params.itemIds.split("&");
    if (itemsIds) {
      this.props.fetchViewSpecificItems(this.props.token, itemsIds);
    }
    this.props.postSeenSpecificItems(this.props.token, itemsIds);
  };

  render() {
    return (
      <PageContainer>
        <Grid style={{ margin: 0 }}>
          <NavBar history={this.props.history} profilePhotoUrl={this.props.profilePhotoUrl} />
          <Grid.Row centered>
            <h1>Matched Opportunities</h1>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column width={11}>
              <DashboardItems
                name={this.props.name}
                token={this.props.token}
                userId={this.props.userId}
                items={this.props.items.items}
                isLoading={this.props.isLoadingDashItems}
                profilePhotoUrl={this.props.profilePhotoUrl}
              />
            </Grid.Column >
          </Grid.Row>
        </Grid>
      </PageContainer>
    )
  };
}

function mapStateProps(state) {
  return {
    dash: state.dash,
    items: state.items,
    userInfo: state.auth,
    name: state.account.name,
    token: state.account.token,
    userId: state.account.userId,
    profilePhotoUrl: state.account.profilePhotoUrl,
    isLoadingDashItems: state.loaders.isLoadingDashItems
  }
}

export default connect(mapStateProps, actions)(ViewSpecificItems);
