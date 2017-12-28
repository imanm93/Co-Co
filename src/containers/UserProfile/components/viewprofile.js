import React, { Component } from 'react';

class ViewProfile extends Component {

  render() {
    console.log(this.props.profile);
    return (
      <div>
        <div>Backgraound Image</div>
        <div>Profile Picture</div>
        <div>Description</div>
        <div>Skills</div>
        <div>Interests</div>
      </div>
    )
  }

}

export default ViewProfile;
