import React, { Component } from 'react';
import { connect } from 'react-redux';

class Landing extends Component {

  render() {
    return(
      <div>
        This is the first Landing Page
      </div>
    )
  }

}

export default connect()(Landing);
