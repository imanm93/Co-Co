import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/';

import StatusItemForm from './components/statusitemform';
import OppItemForm from './components/oppitemform';
import EventItemForm from './components/eventitemform';

class PostNewItem extends Component {

  render() {
    const type = this.props.match.params.type;
    return(
      <div>
        { type === 'status' &&
            <StatusItemForm />
        }
        { type === 'opportunity' &&
            <OppItemForm />
        }
        { type === 'event' &&
            <EventItemForm />
        }
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    filters: state.filters,
    skills: state.skills
  }
}

export default connect(mapStateToProps, actions)(PostNewItem);
