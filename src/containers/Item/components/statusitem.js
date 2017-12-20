import React, { Component } from 'react';

class StatusItem extends Component {

  render() {
    return (
      <div>
        <h3>{this.props.item.user.name}</h3>
        <p>{this.props.item.text}</p>
        <small>{this.props.item.displayTime}</small>        
      </div>
    )
  }

}

export default StatusItem;
