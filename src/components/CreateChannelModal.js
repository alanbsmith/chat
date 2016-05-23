import React from 'react';
import { Modal } from 'react-bootstrap';

const CreateChannelModal = React.createClass({
  hideModal() {
    this.props.hide()
  },
  handleSubmit(e) {
    e.preventDefault();
    let channelName = this.refs.input.value.trim();
    this.props.addChannel({ name: channelName });
    this.hideModal();
  },

  render() {
    return(
      <Modal show={this.props.show} onHide={this.hideModal}>
        <Modal.Header>
          <button className="close" onClick={this.hideModal}><span aria-hidden="true">&times;</span></button>
        </Modal.Header>
        <Modal.Body>
          <h4 className="modal-title">Create a Channel</h4>
          <form onSubmit={this.handleSubmit}>
            <input type="text" ref="input"/>
          </form>
        </Modal.Body>
        <Modal.Footer/>
      </Modal>
    )
  }
});

export default CreateChannelModal;
