import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import moment from 'moment';

class EventItem extends Component {

  render() {
    return (
      <div>
          <div><b>Event</b></div>
          <div><span>{this.props.item.eventType}</span>  <span>#  {this.props.item.topic}</span></div>
          <div>{this.props.item.title}</div>
          <div>Location: {this.props.item.location}</div>
          <div>{ this.props.item.cost ? 'Paid' : 'Free' }</div>
          <div>Cost: {this.props.item.cost}</div>
          <div>End Date: {moment(this.props.item.endDateTime).format("LLL")}</div>
          <div>{this.props.item.user.name}</div>
          <div>{this.props.item.displayTime}</div>
          <Button onClick={() => this.props.onExpand(this.props.item.itemType, this.props.item.itemId)}>See More</Button>
      </div>
    )
  }

}

export default EventItem;
