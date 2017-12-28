import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ItemTypes from '../../constants/items/itemTypes';
import * as actions from '../../actions/itemActions';

import OppItemForm from './components/oppitemform';
import EventItemForm from './components/eventitemform';
import StatusItemForm from './components/statusitemform';

class PostNewItem extends Component {

  post(type, values) {
    this.props.postItem(this.props.token, type, values);
  }

  render() {
    const type = this.props.match.params.type;
    return(
      <div>
        { type === 'opportunity' &&
            <OppItemForm
                type={ItemTypes.OPP_ITEM}
                oppTypes={this.props.filters.oppTypes}
                topicTypes={this.props.filters.topicTypes}
                skills={this.props.skills}
                post={this.post.bind(this)}
            />
        }
        { type === 'event' &&
            <EventItemForm
                type={ItemTypes.EVENT_ITEM}
                eventTypes={this.props.filters.eventTypes}
                topicTypes={this.props.filters.topicTypes}
                post={this.post.bind(this)}
            />
        }
        { type === 'status' &&
            <StatusItemForm
                type={ItemTypes.STATUS_ITEM}
                topicTypes={this.props.filters.topicTypes}
                post={this.post.bind(this)}
            />
        }
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    skills: state.skills.skills,
    token: state.account.token,
    filters: state.filters
  }
}

export default connect(mapStateToProps, actions)(PostNewItem);
