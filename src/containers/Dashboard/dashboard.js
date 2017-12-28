import React, { Component } from 'react';
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

  render() {
    const skills = dictToArray(this.props.skills);
    const filterControls = [
      { type: FilterTypes.TOPICS, filters: this.props.filters.topicTypes },
      { type: FilterTypes.OPP_TYPES, filters: this.props.filters.oppTypes },
      { type: FilterTypes.EVENT_TYPES, filters: this.props.filters.eventTypes }
    ];
    return(
      <div>
        <NavBar history={this.props.history} />
        <hr/>
        <DashboardSearchBar
          items={skills}
          setSearchQuery={this.updateItemsAndSearchQuery.bind(this)}
          onFollowTopic={this.onFollowTopic.bind(this)}
        />
        <hr/>
        <DashboardItemsSelectorBar
          tabs={DashboardTabs}
          onSelected={this.onSelectedView.bind(this)}
        />
        <hr/>
        <DashboardResults
          filters={filterControls}
          userId={this.props.userId}
          items={this.props.items.items}
          setFilterQuery={this.updateItemsAndFilterQuery.bind(this)}
        />
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
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
