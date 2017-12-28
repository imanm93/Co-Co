import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as ItemTypes from '../../constants/items/itemTypes';
import * as actions from '../../actions/itemActions';

import OppItem from './components/oppitem';
import EventItem from './components/eventitem';
import StatusItem from './components/statusitem';
import PeopleItem from './components/peopleitem';
import ItemControls from './itemcontrols';

class Item extends Component {

  onExpand(type, itemId) {
      this.props.fetchExpandedItem(type, itemId, this.props.userId);
  }

  onLike(itemId) {
    console.log("Like", itemId);
  }

  onEmail(itemId) {
    console.log("Email", itemId);
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

  onDelete(itemId) {
    console.log("Delete", itemId);
  }

  onReport(itemId) {
    console.log("Report", itemId);
  }

  render() {
    return (
      <div>
        { this.props.item.itemType === 'opportunity' &&
            <OppItem item={this.props.item} type={ItemTypes.OPP_ITEM} onExpand={this.onExpand.bind(this)} />
        }
        { this.props.item.itemType === 'event' &&
            <EventItem item={this.props.item} type={ItemTypes.EVENT_ITEM} onExpand={this.onExpand.bind(this)} />
        }
        { this.props.item.itemType === 'post' &&
            <StatusItem item={this.props.item} />
        }
        { this.props.item.itemType === 'people' &&
            <PeopleItem />
        }
        <ItemControls
          id={this.props.item.itemId}
          type={this.props.item.type}
          numberOfLikes={this.props.item.numberOfLikes}
          numberOfComments={this.props.item.numberOfComments}
          numberGoing={this.props.item.numberGoing}
          onLike={this.onLike}
          onComments={this.onComments}
          onInterested={this.onInterested}
          onEnquire={this.onEnquire}
        />
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, actions)(Item);
