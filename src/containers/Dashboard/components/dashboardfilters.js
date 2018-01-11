import React, { Component } from 'react';
import * as types from '../../../constants/filters/filterTypes';
import Filters from '../../../components/Filters';
import { Grid, Accordion, Menu, Checkbox } from 'semantic-ui-react';
import styles from './dashboardfilters.css';

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
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
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
        {
          Object.keys(this.props.filters).map(key => {
            return <Accordion as={Menu} vertical style={{ textAlign: 'left' }} key={String(key)}>
              <Accordion.Title
                active={activeIndex === parseInt(key)}
                content={this.props.filters[key].type}
                index={parseInt(key)}
                onClick={this.onExpandFilter.bind(this)}
              />
              <Accordion.Content active={activeIndex === parseInt(key)} content={
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
