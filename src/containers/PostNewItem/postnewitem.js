import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './postnewitem.css';
import * as actions from '../../actions/itemActions';
import * as ItemTypes from '../../constants/items/itemTypes';
import "react-datepicker/dist/react-datepicker.css";

import OppItemForm from './components/oppitemform';
import EventItemForm from './components/eventitemform';
import StatusItemForm from './components/statusitemform';

class PostNewItem extends Component {

  post(type, values) {
    if (this.props.locationExternal) { this.props.postExternalItem(type, values); }
    else if (!this.props.locationExternal) {
      this.props.postItem(this.props.token, type, values, () => {
        console.log('woreeeeeeed');
        console.log(this.props.history)
        this.props.history.push("/dashboard")
      });
    }
  }

  render() {
    return (
      <div>
        {this.props.posts.tab === ItemTypes.OPP_ITEM &&
          <OppItemForm
            type={ItemTypes.OPP_ITEM}
            skills={this.props.skills}
            post={this.post.bind(this)}
            oppTypes={this.props.filters.oppTypes}
            topicTypes={this.props.filters.topicTypes}
            externalEmail={this.props.externalEmail}
            isPostingItem={this.props.isPostingItem}
          />
        }
        {this.props.posts.tab === ItemTypes.EVENT_ITEM &&
          <EventItemForm
            type={ItemTypes.EVENT_ITEM}
            eventTypes={this.props.filters.eventTypes}
            topicTypes={this.props.filters.topicTypes}
            post={this.post.bind(this)}
            externalEmail={this.props.externalEmail}
            isPostingItem={this.props.isPostingItem}
          />
        }
        {this.props.posts.tab === ItemTypes.STATUS_ITEM &&
          <StatusItemForm
            type={ItemTypes.STATUS_ITEM}
            topicTypes={this.props.filters.topicTypes}
            post={this.post.bind(this)}
            isPostingItem={this.props.isPostingItem}
            user={this.props.user}
          />
        }
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    filters: state.filters,
    token: state.account.token,
    skills: state.skills.skills,
    isPostingItem: state.loaders.isPostingItem,
    user: {
      name: state.account.name,
      profilePhotoUrl: state.account.profilePhotoUrl
    }
  }
}

export default connect(mapStateToProps, actions)(PostNewItem);
