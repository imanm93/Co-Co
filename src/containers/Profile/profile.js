import React, { Component } from 'react';
import { connect } from 'react-redux';

class Profile extends Component {
  render() {
    return (
      <div>
        This is your profile
      </div>
    )
  }
}

export default connect()(Profile);
