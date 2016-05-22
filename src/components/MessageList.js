import React from 'react';
import Message from './Message';

const MessageList = (props) => {
  console.log(props.messages)
  let messageList = props.messages.map( (message, index) => {
    return(
      <Message key={ index } message={ message } />
    )
  });
  return(
    <div id="message-list">
      { messageList }
    </div>
  )
};

export default MessageList;
