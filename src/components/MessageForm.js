import React from 'react';
import moment from 'moment';
import LoginModal from './LoginModal';

let socket = io.connect();

const MessageForm = React.createClass({
  getInitialState() {
      return({ name: "", showModal: true })
  },

  handleName(e) {
    e.preventDefault();
    let name = this.refs.name.value.trim();
    this.setState({ name: name })
    this.refs.name.value = "";
  },

  handleSubmit(e) {
    e.preventDefault();
    let text = this.refs.message.value.trim();
    let time = moment().format("h:mm a");
    this.refs.message.value = "";
    socket.emit('new-message', { author: this.state.name, text: text, display_time: time });
  },

  addName(data) {
    this.setState({name: data.name });
  },

  toggleModal() {
    this.setState({ showModal: !this.state.showModal })
  },

  render() {
    if(this.state.name) {
      return(
        <div className="footer">
          <form id="message-form" onSubmit={ this.handleSubmit }>
            <input ref="message" type="text" placeholder="type your message here" />
          </form>
        </div>
      )
    } else {
      return(
        <LoginModal
          addName={this.addName}
          show={this.state.showModal}
          hide={this.toggleModal}
        />
      )
    }
  }
});

export default MessageForm;
