import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { dictToArray } from '../../utils/dictTransforms';
import styles from './dashboard.css';

import * as FilterTypes from '../../constants/filters/filterTypes';
import * as DashboardTabs from '../../constants/dashboard/dashboardTypes';
import * as actions from '../../actions';

import NavBar from '../NavBar';
import DashboardSearchBar from './components/dashboardsearchbar';
import DashboardItemsSelectorBar from './components/dashboarditemsselectorbar';
import DashboardResults from './components/dashboardresults';

class Dashboard extends Component {

  // TODO: Uncomment when endpoints work
  // Remove hard coded user and put in this.props.userId

  componentWillMount() {
      this.props.fetchTopics(this.props.token);
      this.props.fetchSkills(this.props.token);
      this.props.fetchOppTypes(this.props.token);
      this.props.fetchEventTypes(this.props.token);
      this.props.fetchDisciplines(this.props.token);
      this.props.fetchFilteredItems(this.props.token, '4bc79c95-fe50-46f7-8cb8-624a25ac27bb', this.props.dash.tab, this.props.dash.query, this.props.dash.filters, 1);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dash !== this.props.dash) this.props.fetchFilteredItems(
      nextProps.token,
      '4bc79c95-fe50-46f7-8cb8-624a25ac27bb',
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
        filterControls.push({ type: FilterTypes.DISCIPLINES, filters: this.props.filters.disciplineTypes });
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
      <Grid>
        <Grid.Row centered>
          <NavBar history={this.props.history} profilePhotoUrl={this.props.profilePhotoUrl} />
        </Grid.Row>
        <Grid.Row style={{ padding: 0 }} centered>
          <DashboardSearchBar
            items={skills}
            onFollowTopic={this.onFollowTopic.bind(this)}
            setSearchQuery={this.updateItemsAndSearchQuery.bind(this)}
          />
        </Grid.Row>
        <Grid.Row style={{ paddingTop: 0 }} centered>
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
            isLoading={this.props.isLoadingDashItems}
            profilePhotoUrl={this.props.profilePhotoUrl}
            setFilterQuery={this.updateItemsAndFilterQuery.bind(this)}
          />
        </Grid.Row>
      </Grid>
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
