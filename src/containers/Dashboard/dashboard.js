import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { dictToArray } from '../../utils/dictTransforms';
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
  // this.props.fetchPeopleTypes();

  componentWillMount() {
      this.props.fetchTopics(this.props.token);
      this.props.fetchSkills(this.props.token);
      this.props.fetchOppTypes(this.props.token);
      this.props.fetchEventTypes(this.props.token);
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
      default:
        filterControls.push({ type: FilterTypes.OPP_TYPES, filters: this.props.filters.oppTypes });
        filterControls.push({ type: FilterTypes.EVENT_TYPES, filters: this.props.filters.eventTypes });
        break;
    }
    return filterControls;
  }

  render() {
    const skills = dictToArray(this.props.skills);
    const filterControls = this.getFilterControls(this.props.dash.tab);
    return(
      <Grid>
        <Grid.Row centered>
          <NavBar history={this.props.history} />
        </Grid.Row>
        <Grid.Row centered>
          <DashboardSearchBar
            items={skills}
            setSearchQuery={this.updateItemsAndSearchQuery.bind(this)}
            onFollowTopic={this.onFollowTopic.bind(this)}
          />
        </Grid.Row>
        <Grid.Row centered>
          <DashboardItemsSelectorBar
          tabs={DashboardTabs}
          onSelected={this.onSelectedView.bind(this)}
          />
        </Grid.Row>
        <Grid.Row centered>
          <DashboardResults
            isLoading={this.props.isLoadingDashItems}
            filters={filterControls}
            token={this.props.token}
            userId={this.props.userId}
            items={this.props.items.items}
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
    userId: state.account.userId,
    skills: state.skills.skills,
    token: state.account.token,
    filters: state.filters,
    search: state.search,
    items: state.items,
    dash: state.dash
  };
}

export default connect(mapStateToProps, actions)(Dashboard);
