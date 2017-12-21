import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as types from '../../constants/filters/filterTypes';
import * as actions from '../../actions';

import NavBar from '../NavBar';
import DashboardSearchBar from './components/dashboardsearchbar';
import DashboardItemsSelectorBar from './components/dashboarditemsselectorbar';
import DashboardResults from './components/dashboardresults';

class Dashboard extends Component {

  componentWillMount() {
      this.props.fetchOppTypes();
      this.props.fetchTopics();
      this.props.fetchEventTypes();
      // TODO: Uncomment when endpoints work
      // this.props.fetchSkills();
      // this.props.fetchPeopleTypes();
  }

  setFilterQuery(query) {
    this.props.setFilterQuery(query);
  }

  setSearchQuery(query) {
    this.props.setSearchQuery(query);
  }

  render() {
    const items = {
      2: {
          "type": "post",
          "text": "Check out these cool animations by Joshua Davis! https://vimeo.com/233063640",
          "timestamp": 1505239666270,
          "itemId": 2,
          "user": {
            "id": "d98cf5ad-c2cc-4884-854f-04523f711b4d",
            "profilePhotoUrl": "https://coandco.blob.core.windows.net/imagescoandcostaging/g0c5szyh.png",
            "name": "Aiden Kwok"
          },
          "numberOfLikes": 3,
          "numberOfComments": 1,
          "displayTime": "Posted 97 days ago"
        },
      9: {
          "type": "post",
          "text": "Live acid croft from Shooglenifty featuring Laura Wilkie: Thursday 21st, ticket link here: https://www.eventbrite.co.uk/e/shooglenifty-featuring-laura-wilkie-tickets-36924087941?utm_campaign=new_event_email&utm_medium=email&utm_source=eb_email&utm_term=viewmyevent_button ",
          "timestamp": 1505494095674,
          "itemId": 9,
          "user": {
            "id": "df5ba700-30eb-4469-8a0b-8b2ca8922a4c",
            "profilePhotoUrl": "https://coandco.blob.core.windows.net/imagescoandcostaging/p3toytjo.jpg",
            "name": "Colvin Cruickshank"
          },
          "numberOfLikes": 1,
          "numberOfComments": 0,
          "displayTime": "Posted 94 days ago"
        }
    };
    const skills = {
      0: 'poster',
      1: 'branding',
      2: 'react'
    };
    const filterControls = [
      {
        type: types.TOPICS,
        filters: this.props.filters.topicTypes
      },
      {
        type: types.OPP_TYPES,
        filters: this.props.filters.oppTypes
      },
      {
        type: types.EVENT_TYPES,
        filters: this.props.filters.eventTypes
      }
    ];
    return(
      <div>
        <NavBar />
        <hr/>
        <DashboardSearchBar skills={this.props.skills} setSearchQuery={this.setSearchQuery.bind(this)} />
        <hr/>
        <DashboardItemsSelectorBar />
        <hr/>
        <DashboardResults items={items} filters={filterControls} setFilterQuery={this.setFilterQuery.bind(this)} />
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    skills: state.skills,
    filters: state.filters,
    items: state.filteredItems,
    search: state.search
  };
}

export default connect(mapStateToProps, actions)(Dashboard);
