import React, { Component } from 'react';
import { connect } from 'react-redux';

import OppItem from './components/oppitem';
import EventItem from './components/eventitem';
import StatusItem from './components/statusitem';
import PeopleItem from './components/peopleitem';
import ItemControls from './itemcontrols';

class Item extends Component {

  onLike(itemId) {
    console.log("Like", itemId);
  }

  onEmail(itemId) {
    console.log("Email", itemId);
  }

  onExpand(itemId) {
    console.log("Expand", itemId);
  }

  onDelete(itemId) {
    console.log("Delete", itemId);
  }

  onReport(itemId) {
    console.log("Report", itemId);
  }

  onEnquire(itemId) {
    console.log("Enquire", itemId);
  }

  onComments(itemId) {
    console.log("Comment", itemId);
  }

  onInterested(itemId) {
    console.log("Interested", itemId);
  }

  render() {
    return (
      <div>
        { this.props.item.type === 'opportunity' &&
            <OppItem />
        }
        { this.props.item.type === 'event' &&
            <EventItem />
        }
        { this.props.item.type === 'post' &&
            <StatusItem item={this.props.item} />
        }
        { this.props.item.people === 'people' &&
            <PeopleItem />
        }
        <ItemControls
          id={this.props.item.itemId}
          type={this.props.item.type}
          numberOfLikes={this.props.item.numberOfLikes}
          numberOfComments={this.props.item.numberOfComments}
          onLike={this.onLike}
          onComments={this.onComments}
          onInterested={this.onInterested}
          onEnquire={this.onEnquire}
        />
      </div>
    )
  }

}

export default connect()(Item);
