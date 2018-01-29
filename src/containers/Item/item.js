import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import styles from './item.css';

import * as actions from '../../actions';
import * as ItemTypes from '../../constants/items/itemTypes';

import OppItem from './components/oppitem';
import EventItem from './components/eventitem';
import StatusItem from './components/statusitem';
import PeopleItem from './components/peopleitem';
import ItemControls from './itemcontrols';
import ItemComments from './itemcomments';

class Item extends Component {

  onExpand() {
    this.props.fetchExpandedItem(this.props.token, this.props.item.itemType, this.props.item.itemId, this.props.userId);
  }

  onShrink() {
    this.props.shrinkItem(this.props.token, this.props.item.itemType, this.props.item.itemId, this.props.userId);
  }

  onComments() {
    if (!this.props.item.showComments) this.props.fetchCommentsItem(this.props.token, this.props.item.itemId);
    if (this.props.item.showComments) this.props.resetComments(this.props.item.itemId);
  }

  onPostComment(comment) {
    this.props.postComment(this.props.token, this.props.userId, this.props.name, this.props.profilePhotoUrl, this.props.item.itemId, comment);
  }

  onLike() {
    this.props.postLike(this.props.token, this.props.item.itemId);
  }

  onInterested() {
    if (!this.props.item.going) this.props.postInterested(this.props.token, this.props.userId, this.props.item.itemId);
    if (this.props.item.going) this.props.postNotInterested(this.props.token, this.props.userId, this.props.item.itemId);
  }

  onDelete(type, itemId) {
    this.props.postDelete(this.props.token, this.props.item.itemType, this.props.item.itemId);
  }

  onConnect() {
    this.props.postConnect(this.props.token, this.props.item.user.id);
  }

  onEmail(itemId) {
    console.log("Email", itemId);
  }

  onEnquire(itemId) {
    this.props.postEnquire(this.props.token, this.props.item.itemId)
    console.log("Enquire", itemId);
  }

  onReport(itemId) {
    console.log("Report", itemId);
  }

  onAcceptConnection() {
    this.props.postFromItemAcceptConnection(this.props.token, this.props.item.user.id);
  }

  onRejectConnection() {
    this.props.postFromItemRejectConnection(this.props.token, this.props.item.user.id);
  }

  onRedirectToProfile() {
    this.props.setDashFilter({ 'myConnections': false });
    this.props.setProfileViewId(this.props.token, this.props.item.user.id, this.props.history);
  }

  getItemOuterStyle() {
    if (this.props.item.itemType !== 'user') return { padding: '0', borderRadius: '5px', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.22)', margin: '0.5em', marginTop: '0em', marginBottom: '2em' }
    else return { padding: '0', borderRadius: '5px', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.22)', margin: '0.5em', marginTop: '0em', marginBottom: '0em' }
  }

  render() {
    const itemOuterStyle = this.getItemOuterStyle();
    return (
      <Grid style={itemOuterStyle}>
        {this.props.item.itemType === 'opportunity' &&
          <OppItem skills={this.props.skills} item={this.props.item} type={ItemTypes.OPP_ITEM} onExpand={this.onExpand.bind(this)} />
        }
        {this.props.item.itemType === 'event' &&
          <EventItem item={this.props.item} type={ItemTypes.EVENT_ITEM} onExpand={this.onExpand.bind(this)} onShrink={this.onShrink.bind(this)} />
        }
        {this.props.item.itemType === 'post' &&
          <StatusItem item={this.props.item} />
        }
        {this.props.item.itemType === 'user' &&
          <PeopleItem
            item={this.props.item}
            onConnect={this.onConnect.bind(this)}
            isMyConnections={this.props.isMyConnections}
            onAcceptConnection={this.onAcceptConnection.bind(this)}
            onRejectConnection={this.onRejectConnection.bind(this)}
            redirectToProfile={this.onRedirectToProfile.bind(this)}
          />
        }
        {this.props.item.itemType !== 'user' &&
          <ItemControls
            userId={this.props.userId}
            email={this.props.item.companyDetails && this.props.item.companyDetails.contactEmail ? this.props.item.companyDetails.contactEmail : this.props.item.user.email}
            type={this.props.item.itemType}
            itemUserId={this.props.item.user.id}
            numberOfLikes={this.props.item.numberOfLikes}
            numberOfComments={this.props.item.numberOfComments}
            numberGoing={this.props.item.numberGoing}
            going={this.props.item.going}
            isLiked={this.props.item.isLiked}
            onLike={this.onLike.bind(this)}
            onComments={this.onComments.bind(this)}
            onInterested={this.onInterested.bind(this)}
            onDelete={this.onDelete.bind(this)}
            onEnquire={this.onEnquire.bind(this)}
          />
        }
        {this.props.item.showComments &&
          <Grid.Row>
            <ItemComments
              comments={this.props.item.comments}
              onPostComment={this.onPostComment.bind(this)}
            />
          </Grid.Row>
        }
      </Grid>
    )
  }

}

function mapStateToProps(state) {
  return {
    skills: state.skills.skills
  };
}

export default connect(mapStateToProps, actions)(Item);
