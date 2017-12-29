import React, { Component } from 'react';

class WorkExample extends Component {

  render() {
    return (
      <div>
        <div>{this.props.item.title}</div>
        <div>{this.props.item.description}</div>
        <div>{this.props.item.projectUrl}</div>
        <div>{this.props.item.mediaUrl}</div>
      </div>
    )
  }

}

export default WorkExample;
