import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as types from '../../constants/filters/filterTypes';
import * as actions from '../../actions';
import { dictToArray } from '../../utils/dictTransforms';

import NavBar from '../NavBar';
import DashboardSearchBar from './components/dashboardsearchbar';
import DashboardItemsSelectorBar from './components/dashboarditemsselectorbar';
import DashboardResults from './components/dashboardresults';

class Dashboard extends Component {

  componentWillMount() {
      this.props.fetchOppTypes();
      this.props.fetchTopics();
      this.props.fetchEventTypes();
      this.props.fetchSkills();
      this.props.fetchFilteredItems('0d17ad18-7ff0-406e-b3ee-c3a113c97f55', '&', 1);
      // TODO: Uncomment when endpoints work
      // this.props.fetchPeopleTypes();
  }

  setFilterQuery(query) {
    this.props.setFilterQuery(query);
  }

  setSearchQuery(query) {
    this.props.setSearchQuery(query);
  }

  getDashboardItems() {
    let completeQ = '';
    if (this.props.search.dashquery.length > 0) completeQ = '&' + this.props.search.dashquery + '&' + this.props.filters.dashquery;
    if (this.props.search.dashquery.length === 0) completeQ = '&' + this.props.filters.dashquery;
    this.props.fetchFilteredItems('0d17ad18-7ff0-406e-b3ee-c3a113c97f55', completeQ, 1);
  }

  render() {
    const filterControls = [
      { type: types.TOPICS, filters: this.props.filters.topicTypes },
      { type: types.OPP_TYPES, filters: this.props.filters.oppTypes },
      { type: types.EVENT_TYPES, filters: this.props.filters.eventTypes }
    ];
    const skills = dictToArray(this.props.skills);
    return(
      <div>
        <NavBar />
        <hr/>
        <DashboardSearchBar items={skills} setSearchQuery={this.setSearchQuery.bind(this)} />
        <hr/>
        <DashboardItemsSelectorBar />
        <hr/>
        <DashboardResults items={this.props.items.items} filters={filterControls} setFilterQuery={this.setFilterQuery.bind(this)} userId={this.props.userId} />
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    userId: state.account.userId,
    skills: state.skills.skills,
    filters: state.filters,
    search: state.search,
    items: state.items
  };
}

export default connect(mapStateToProps, actions)(Dashboard);
