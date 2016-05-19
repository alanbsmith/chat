import '../assets/stylesheets/base.scss';
import React from 'react';

// components
import MessageList from './MessageList';
import MessageForm from './MessageForm';

let socket = io.connect();

const App = React.createClass({
  getInitialState() {
    return { messages: [] };
  },

  componentDidMount() {
    socket.on('connect', function(data) {
      socket.emit('join', 'hello world from the client!');
    });
    socket.on('add-message', this._addMessage);
  },

  _addMessage(data) {
    this.state.messages.push(data);
    this.setState({ messages: this.state.messages });
  },

  render() {
    return(
      <div className="container-fluid">
        <div className="jumbotron">
          <h1>Buh Bye HipChat</h1>
        </div>
        <MessageList messages={ this.state.messages } />
        <MessageForm handleMessage={ this.addMessage } />
      </div>
    )
  }
});

export default App;
