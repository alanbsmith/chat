import React from 'react';
import CreateChannelModal from './CreateChannelModal';


const SidebarContent = React.createClass({
  getInitialState() {
    return { channels: [], showModal: false };
  },

  addChannel(data) {
    this.state.channels.push(data);
    this.setState({channels: this.state.channels });
  },

  toggleModal() {
    this.setState({ showModal: !this.state.showModal })
  },
  render() {
    let channels = this.state.channels.map((channel, index) => {
      return(
        <li key={index}><a>{channel.name}</a></li>
      )
    });
    return(
      <div>
        <ul>
          <li id="sidebar-header">
            <a onClick={this.toggleModal}>CREATE CHANNEL</a>
          </li>
          {channels}
        </ul>
        <CreateChannelModal
          addChannel={this.addChannel}
          show={this.state.showModal}
          hide={this.toggleModal}
        />
      </div>
    )
  }
});

export default SidebarContent;
