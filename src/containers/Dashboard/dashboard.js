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
      this.props.fetchSkills();
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
    console.log('?' + this.props.search.dashquery + '&' + this.props.filters.dashquery)
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
        },
      108: {
          "type": "opportunity",
          "opportunityType": "Collaboration, Commission or Request",
          "category": "Copywriting",
          "companyDetails": {
            "logo": null,
            "name": null,
            "contactEmail": null,
            "emailVerified": false,
            "companyWebsite": null,
            "contactName": null
          },
          "title": "123123123123123123aaaaaaa",
          "timestamp": 1506260020685,
          "itemId": 108,
          "user": {
            "id": "00847320-6653-4306-9799-47099dfc37c8",
            "profilePhotoUrl": "https://coandco.blob.core.windows.net/imagescoandco/k05zoujz.png",
            "name": "Edson Alcala"
          },
          "numberOfLikes": 0,
          "numberOfComments": 0,
          "displayTime": "Posted 87 days ago",
          "topic": "Other"
        },
      171: {
          "type": "event",
          "endDateTime": "2018-05-28T11:33:20+01:00",
          "photoUrl": null,
          "cost": "string",
          "location": "string",
          "eventType": "Volunteering",
          "numberGoing": 1,
          "companyDetails": {
            "logo": null,
            "name": null,
            "contactEmail": null,
            "emailVerified": false,
            "companyWebsite": null,
            "contactName": null
          },
          "title": "string",
          "timestamp": 1506478322323,
          "itemId": 171,
          "user": {
            "id": "33021b87-e396-4101-8d62-f54435d331f3",
            "profilePhotoUrl": "https://coandco.blob.core.windows.net/systemimagescoandco/profile/profile-icon.png",
            "name": "Diana Despa"
          },
          "numberOfLikes": 1,
          "numberOfComments": 0,
          "displayTime": "Posted just now",
          "topic": "Travel & Outdoors"
        }
    };
    const skills = Object.keys(this.props.skills).map(key => {
      return {
        id: key,
        name: this.props.skills[key]
      }
    });
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
    this.getDashboardItems();
    return(
      <div>
        <NavBar />
        <hr/>
        <DashboardSearchBar items={skills} setSearchQuery={this.setSearchQuery.bind(this)} />
        <hr/>
        <DashboardItemsSelectorBar />
        <hr/>
        <DashboardResults items={items} filters={filterControls} setFilterQuery={this.setFilterQuery.bind(this)} userId={this.props.userId} />
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    skills: state.skills.skills,
    filters: state.filters,
    search: state.search,
    items: state.filteredItems,
    userId: state.account.userId
  };
}

export default connect(mapStateToProps, actions)(Dashboard);
