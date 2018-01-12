import React, { Component } from 'react';
import Filters from '../Filters';

class FiltersForm extends Component {

  updateSelected(type, q) {
    let items = q.split(",");
    this.props.updateSelection(items);
  }

  render() {
    return(
      <div>
        <div><b>{this.props.title}</b></div>
        { this.props.message &&
          <div>{this.props.message}</div>
        }
        <Filters type={this.props.type} filters={this.props.types} updateQuery={this.updateSelected.bind(this)} selectedTopics={this.props.selectedTopics} />
      </div>
    )
  }

}

export default FiltersForm;
