import '../assets/stylesheets/base.scss';
import React from 'react';
import Sidebar from 'react-sidebar';

// components
import MessageList from './MessageList';
import MessageForm from './MessageForm';

let socket = io.connect();

const App = React.createClass({
  getInitialState() {
    return { messages: [], sidebarOpen: false };
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

  onSetSidebarOpen: function(open) {
    this.setState({sidebarOpen: open});
  },

  render() {
    return(
      <div>
        <Sidebar
          sidebarClassName="sidebar"
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}>

          <div className="header">
            <a className="glyphicon glyphicon-menu-hamburger" id="menu-toggle" onClick={this.onSetSidebarOpen}></a>
            <h1>Chat</h1>
          </div>
          <div>
            <MessageList messages={ this.state.messages } />
            <MessageForm
              handleMessage={ this.addMessage }
            />
          </div>
        </Sidebar>
      </div>
    )
  }
});

export default App;
