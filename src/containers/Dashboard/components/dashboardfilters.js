import React, { Component } from 'react';
import * as types from '../../../constants/filters/filterTypes';
import Filters from '../../../components/Filters';

class DashboardFilters extends Component {

  componentWillMount() {
    this.setState({
      [types.OPP_TYPES]: '',
      [types.EVENT_TYPES]: '',
      [types.TOPICS]: ''
    });
  }

  setQuery(key, newVal) {
    this.setState({
      [key]: newVal
    }, function() {
      this.genFilterQuery();
    });
  }

  updateQuery(type, q) {
      switch(type) {
        case types.OPP_TYPES:
            if (q.length > 0) this.setQuery(type, 'OpportunityTypeIds=' + q);
            if (q.length === 0) this.setQuery(type, '');
            break;
        case types.EVENT_TYPES:
            if (q.length > 0) this.setQuery(type, 'EventCategoryIds=' + q);
            if (q.length === 0) this.setQuery(type, '');
            break;
        case types.TOPICS:
            if (q.length > 0) this.setQuery(type, 'TopicIds=' + q);
            if (q.length === 0) this.setQuery(type, '');
            break;
        default:
            break;
      }
  }

  genFilterQuery() {
    let query = '';
    Object.keys(this.state).map(key => {
        if (this.state[key].length > 0) query = query + this.state[key] + '&';
        return query;
    });
    this.props.setFilterQuery(query);
  }

  render() {
    return(
      <div>
        <b>Filter By</b><br/>
        {
          Object.keys(this.props.filters).map(key => {
            return <Filters key={key} title={this.props.filters[key].type} filters={this.props.filters[key].filters} updateQuery={this.updateQuery.bind(this)} />
          })
        }
      </div>
    )
  }

}

export default DashboardFilters;
