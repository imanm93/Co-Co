import React, { Component } from 'react';
import { Checkbox } from 'semantic-ui-react';

class Filters extends Component {

  componentWillMount() {
    this.setState({
      filters: this.props.filters,
      selectedCheckbox: new Set()
    }, function() {
      if (this.props.selectedFilters) this.props.selectedFilters.map(topicId => {
        this.updateFilter(String(topicId));
      });
    });
  }

  updateSubQuery(set) {
    let query = "";
    set.forEach(selectedFilter => {
      query = query + selectedFilter + ',';
    });
    query = query.slice(0, query.length-1);
    this.props.updateQuery(this.props.type, query);
  }

  updateFilter(key) {
    console.log(key);
    const selectedCheckbox = this.state.selectedCheckbox;
    if (selectedCheckbox.has(key)) { selectedCheckbox.delete(key) }
    else if (!selectedCheckbox.has(key)) { selectedCheckbox.add(key) };
    this.setState({
      selectedCheckbox: selectedCheckbox
    }, function() {
      this.updateSubQuery(this.state.selectedCheckbox);
    });
  }

  render() {
    return(
      <div style={{ textAlign: 'left' }}>
        { this.state.filters &&
            Object.keys(this.state.filters).map(key => {
              return <div key={'filters'+key}>
                { this.state.selectedCheckbox.has(key) &&
                  <Checkbox key={String(key)} style={{ display: 'block' }} label={this.props.filters[key]} onChange={() => this.updateFilter(key)} checked={true} /> }
                { !this.state.selectedCheckbox.has(key) &&
                  <Checkbox key={String(key)} style={{ display: 'block' }} label={this.props.filters[key]} onChange={() => this.updateFilter(key)} checked={false} /> }
              </div>
            })
        }
      </div>
    )
  }

}

export default Filters;
