import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as types from '../../../constants/filters/filterTypes';
import * as actions from '../../../actions/filtersActions';

import Filters from '../../../components/Filters';

class DashboardFilters extends Component {

  componentWillMount() {
    this.props.fetchOppTypes();
    this.props.fetchPeopleTypes();
    this.props.fetchEventTypes();
    this.props.fetchTopics();
  }

  updateQuery(type, q) {
    switch(type) {
      case types.OPP_TYPES:
        const o = 'OpportunityTypeIds=' + q;
        console.log(o);
        break;
      case types.PEOPLE_TYPES:
        break;
      case types.EVENT_TYPES:
        const e = 'EventCategoryIds=' + q;
        console.log(e);
        break;
      case types.TOPICS:
        const t = 'Topics=' + q;
        console.log(t);
        break;
      default:
        return q;
    }
  }

  // { this.props.peopleFilters &&
  //   <Filters title="People Types" filters={this.props.peopleFilters} />
  // }
  // { this.props.filters.oppTypes &&
  //   <Filters title="Opportunity Types" filters={this.props.filters.oppTypes} updateQuery={this.updateQuery} />
  // }
  // { this.props.filters.eventTypes &&
  //   <Filters title="Event Types" filters={this.props.filters.eventTypes} updateQuery={this.updateQuery} />
  // }

  render() {
    return(
      <div>
        <b>Filter By</b><br/>
        { this.props.filters.topicTypes &&
          <Filters title={types.TOPICS} filters={this.props.filters.topicTypes} updateQuery={this.updateQuery} />
        }
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    filters: state.filters
  };
}

export default connect(mapStateToProps, actions)(DashboardFilters);
