import React from 'react';
import moment from 'moment';
let socket = io.connect();

const MessageForm = React.createClass({
  getInitialState() {
      return({ name: "" })
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

  render() {
    if(this.state.name) {
      return(
        <div>
          <form id="message-form" onSubmit={ this.handleSubmit }>
            <input ref="message" type="text" placeholder="type your message here" />
          </form>
        </div>
      )
    } else {
      return(
        <div>
          <form id="name-form" onSubmit={ this.handleName }>
            <input ref="name" type="text" placeholder="add your name" />
          </form>
        </div>
      )
    }
  }
});

export default MessageForm;
