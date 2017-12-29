import React, { Component } from 'react';

class SocialMediaLink extends Component {

  render() {
    return (
      <div>{this.props.name}: {this.props.url}</div>
    )
  }

}

export default SocialMediaLink;
