import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';

class TermsAndConditionsModal extends Component {

  render() {
    return(
      <Modal open={this.props.open} onClose={this.props.onClose}>
        <Modal.Header>Co & Co Terms and Conditions</Modal.Header>
        <Modal.Content className="guidelines">
          <object data="https://coandco.blob.core.windows.net/systemimagescoandco/files/coandco-terms-conditions.pdf" type="application/pdf" width="100%" height="100%">
            <p>Alternative text - include a link <a href="https://coandco.blob.core.windows.net/systemimagescoandco/files/coandco-terms-conditions.pdf">to the PDF!</a></p>
          </object>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.props.onClose}>Close</Button>
        </Modal.Actions>
      </Modal>
    )
  }

}

export default TermsAndConditionsModal;
