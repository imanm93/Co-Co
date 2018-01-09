import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { dictToArray } from '../../utils/dictTransforms';
import styles from './dashboard.css';

import * as FilterTypes from '../../constants/filters/filterTypes';
import * as DashboardTabs from '../../constants/dashboard/dashboardTypes';
import * as actions from '../../actions';

import NavBar from '../NavBar';
import PageContainer from '../../components/PageContainer';
import DashboardResults from './components/dashboardresults';
import DashboardSearchBar from './components/dashboardsearchbar';
import DashboardItemsSelectorBar from './components/dashboarditemsselectorbar';

class Dashboard extends Component {

  componentWillMount() {
      this.props.fetchTopics(this.props.token);
      this.props.fetchSkills(this.props.token);
      this.props.fetchOppTypes(this.props.token);
      this.props.fetchEventTypes(this.props.token);
      this.props.fetchDisciplines(this.props.token);
      this.props.fetchFilteredItems(this.props.token, '0d17ad18-7ff0-406e-b3ee-c3a113c97f55', this.props.dash.tab, this.props.dash.query, this.props.dash.filters, 1);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dash !== this.props.dash) this.props.fetchFilteredItems(
      nextProps.token,
      '0d17ad18-7ff0-406e-b3ee-c3a113c97f55',
      nextProps.dash.tab,
      nextProps.dash.query,
      nextProps.dash.filters,
      1
    );
  }

  updateItemsAndFilterQuery(key, newVal) {
    this.props.setDashFilter({ [key]: newVal });
  }

  updateItemsAndSearchQuery(query) {
    this.props.setDashQuery(query);
  }

  onSelectedView(tab) {
    this.props.setDashTab(tab);
  }

  onFollowTopic(topic) {
    console.log("Following Topic", topic);
  }

  getFilterControls(tab) {
    let filterControls = [];
    filterControls.push({ type: FilterTypes.TOPICS, filters: this.props.filters.topicTypes });
    switch(tab) {
      case DashboardTabs.OPPORTUNITIES:
        filterControls.push({ type: FilterTypes.OPP_TYPES, filters: this.props.filters.oppTypes });
        break;
      case DashboardTabs.EVENTS:
        filterControls.push({ type: FilterTypes.EVENT_TYPES, filters: this.props.filters.eventTypes });
        break;
      case DashboardTabs.STATUS:
        break;
      case DashboardTabs.PEOPLE:
        break;
      default:
        filterControls.push({ type: FilterTypes.OPP_TYPES, filters: this.props.filters.oppTypes });
        filterControls.push({ type: FilterTypes.EVENT_TYPES, filters: this.props.filters.eventTypes });
        break;
    }
    return filterControls;
  }

  redirectToSignIn() {
    this.props.history.push('/signin');
  }

  render() {
    if (this.props.api.err.status === 401) this.redirectToSignIn();
    const skills = dictToArray(this.props.skills);
    const filterControls = this.getFilterControls(this.props.dash.tab);
    return(
      <PageContainer>
        <Grid style={{ margin: 0 }}>
          <NavBar history={this.props.history} profilePhotoUrl={this.props.profilePhotoUrl} />
          <DashboardSearchBar
            items={skills}
            onFollowTopic={this.onFollowTopic.bind(this)}
            setSearchQuery={this.updateItemsAndSearchQuery.bind(this)}
          />
          <Grid.Row centered style={{ padding: 0 }}>
            <DashboardItemsSelectorBar
              tabs={DashboardTabs}
              currentTab={this.props.dash.tab}
              onSelected={this.onSelectedView.bind(this)}
            />
          </Grid.Row>
          <Grid.Row centered>
            <DashboardResults
              name={this.props.name}
              token={this.props.token}
              filters={filterControls}
              userId={this.props.userId}
              items={this.props.items.items}
              currentTab={this.props.dash.tab}
              isLoading={this.props.isLoadingDashItems}
              profilePhotoUrl={this.props.profilePhotoUrl}
              setFilterQuery={this.updateItemsAndFilterQuery.bind(this)}
            />
          </Grid.Row>
        </Grid>
      </PageContainer>
    );
  }

}

function mapStateToProps(state) {
  return {
    isLoadingDashItems: state.loader.isLoadingDashItems,
    profilePhotoUrl: state.account.profilePhotoUrl,
    courses: state.setup.courses,
    userId: state.account.userId,
    skills: state.skills.skills,
    token: state.account.token,
    name: state.account.name,
    filters: state.filters,
    search: state.search,
    items: state.items,
    dash: state.dash,
    api: state.api
  };
}

export default connect(mapStateToProps, actions)(Dashboard);
