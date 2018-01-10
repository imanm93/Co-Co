import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';

class SimpleModalContainer extends Component {

  render() {
    return(
      <Modal open={this.props.open}>
        {this.props.children}
      </Modal>
    )
  }

}

export default SimpleModalContainer;
