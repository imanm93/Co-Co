import React, { Component } from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react';

class ModalContainer extends Component {

  componentWillMount() {
    this.setState({
      modalOpen: false
    });
  }

  onOpen(e) {
    this.setState({ modalOpen: true });
  }

  onClose(e) {
    this.setState({ modalOpen: false });
  }

  render() {
    return (
      <Modal
        trigger={
          <Button type="button" {...this.props.buttonProps} onClick={this.onOpen.bind(this)}>
            {this.props.showIcon && <Icon name={this.props.iconClass}/>}{this.props.buttonName}
          </Button>
        }
        onClose={this.onClose.bind(this)}
        open={this.state.modalOpen}
      >
        <Modal.Content>
            {this.props.children}
        </Modal.Content>
      </Modal>
    )
  }
}

ModalContainer.defaultProps = {
  showIcon: true,
  iconClass: 'plus'
};

export default ModalContainer;
