import '../assets/stylesheets/base.scss';
import React from 'react';
import Sidebar from 'react-sidebar';

// components
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import SidebarContent from './SidebarContent';
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
    this.getMessages();
  },

  getMessages() {
    $.ajax({
      type: 'get',
      dataType: 'json',
      url: 'http://localhost:3001/api/v1/messages.json',
      success: (data) => {
        this.setState({ messages: data });
      },
      error: (xhr,err) => {
        console.log(err);
      }
    })
  },

  _addMessage(data) {
    this.state.messages.push(data);
    this.setState({ messages: this.state.messages });
  },

  render() {
    return(
      <div>
        <Sidebar
          sidebar={< SidebarContent />}
          sidebarClassName="sidebar"
          shadow={false}
          docked={true}
          >
          <div className="header">
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
