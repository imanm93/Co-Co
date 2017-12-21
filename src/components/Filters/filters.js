import React, { Component } from 'react';
import { Checkbox } from 'semantic-ui-react';

class Filters extends Component {

  componentWillMount() {
    this.selectedCheckbox = new Set();
  }

  updateSubQuery(set) {
    let query = "";
    set.forEach(selectedFilter => {
      query = query + selectedFilter + ',';
    });
    query = query.slice(0, query.length-1);
    this.props.updateQuery(this.props.title, query);
  }

  updateFilter(key) {
    if (this.selectedCheckbox.has(key)) this.selectedCheckbox.delete(key)
    else this.selectedCheckbox.add(key)
    this.updateSubQuery(this.selectedCheckbox);
  }

  render() {
    return(
      <div>
        <b>{this.props.title}</b><br/>
        { this.props.filters &&
          Object.keys(this.props.filters).map(key => {
            return (<Checkbox key={String(key)} style={{ display: 'block' }} label={this.props.filters[key]} onClick={() => this.updateFilter(key)} />)
          })
        }
      </div>
    )
  }

}

export default Filters;
