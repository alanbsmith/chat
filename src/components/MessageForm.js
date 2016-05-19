import React from 'react';
let socket = io.connect();

const MessageForm = React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    let text = this.refs.message.value.trim();
    this.refs.message.value = "";
    socket.emit('new-message', text);
  },
  render() {
    return(
      <div>
        <form onSubmit={ this.handleSubmit }>
          <input ref="message" type="text" />
        </form>
      </div>
    )
  }
});

export default MessageForm;
