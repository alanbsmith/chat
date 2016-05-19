import React from 'react';
import Message from './Message';

const MessageList = (props) => {
  let messageList = props.messages.map( (message, index) => {
    return(
      <Message key={ index } text={ message } />
    )
  });
  return(
    <div>
      { messageList }
    </div>
  )
};

export default MessageList;
