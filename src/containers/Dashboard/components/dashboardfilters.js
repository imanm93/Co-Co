import React, { Component } from 'react';
import styles from './dashboardfilters.css';
import Filters from '../../../components/Filters';
import * as types from '../../../constants/filters/filterTypes';
import { Grid, Accordion, Menu, Checkbox, Sticky } from 'semantic-ui-react';

class DashboardFilters extends Component {

  componentWillMount() {
    this.setState({
      [types.OPP_TYPES]: '',
      [types.EVENT_TYPES]: '',
      [types.TOPICS]: '',
      activeIndex: -1
    });
  }

  setQuery(key, keyText, newVal) {
    this.setState({
      [key]: newVal
    }, function() {
      this.props.setFilterQuery(keyText, newVal);
    });
  }

  updateQuery(type, q) {
      switch(type) {
        case types.OPP_TYPES:
            this.setQuery(type, 'OpportunityTypeIds', q);
            break;
        case types.EVENT_TYPES:
            this.setQuery(type, 'EventTypeIds', q);
            break;
        case types.TOPICS:
            this.setQuery(type, 'TopicIds', q);
            break;
        default:
            break;
      }
  }

  onExpandFilter(e, props) {
    const { index } = props;
    if (this.state[index]) this.setState({ [index]: false });
    if (!this.state[index]) this.setState({ [index]: true });
  }

  render() {
    const { activeIndex } = this.state;
    return(
      <Grid.Row className='coandco-dashboard-filters'>
        <div className='coandco-dashboard-filter-header'>Filter By</div>
        { this.props.currentTab === 'People' &&
          <div style={{ padding: '0.5rem', fontWeight: '600', borderTop: '1px solid rgba(34,36,38,.15)' }}>
            <Checkbox label='MY CONNECTIONS' onChange={this.props.onMyConnections} />
          </div>
        }
        { !this.props.isMyConnections &&
          Object.keys(this.props.filters).map(key => {
            return <Accordion as={Menu} vertical style={{ textAlign: 'left' }} key={String(key)}>
              <Accordion.Title
                index={parseInt(key)}
                content={this.props.filters[key].type}
                onClick={this.onExpandFilter.bind(this)}
              />
              <Accordion.Content active={this.state[key]} content={
                  (
                    <Filters
                      type={this.props.filters[key].type}
                      filters={this.props.filters[key].filters}
                      updateQuery={this.updateQuery.bind(this)} />
                  )
                }
              />
            </Accordion>
          })
        }
      </Grid.Row>
    )
  }

}

export default DashboardFilters;
