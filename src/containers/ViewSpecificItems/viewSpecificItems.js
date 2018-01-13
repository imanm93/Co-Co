import React from 'react';
import * as actions from '../../actions';
import { connect, } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import DashboardItems from '../Dashboard/components/dashboarditems';
import PageContainer from '../../components/PageContainer';
import NavBar from '../NavBar';

class ViewSpecificItems extends React.Component {

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    let itemsIds = this.props.match.params.itemIds.split("&");
    if (itemsIds) {
      this.props.fetchViewSpecificItems(this.props.token, itemsIds);
    }

  };

  render() {
    return (

      <PageContainer>
        <Grid style={{ margin: 0 }}>
          <NavBar history={this.props.history} profilePhotoUrl={this.props.profilePhotoUrl} />
          <Grid.Row centered>
            <Grid.Column width={11}>
              <DashboardItems
                items={this.props.items.items}
                userId={this.props.userId}
                name={this.props.name}
                profilePhotoUrl={this.props.profilePhotoUrl}
                token={this.props.token}
                isLoading={this.props.isLoadingDashItems}
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
    userInfo: state.auth,
    isLoadingDashItems: state.loaders.isLoadingDashItems,
    items: state.items,
    userId: state.account.userId,
    profilePhotoUrl: state.account.profilePhotoUrl,
    token: state.account.token,
    dash: state.dash,
    name: state.account.name
  }
}

export default connect(mapStateProps, actions)(ViewSpecificItems);
