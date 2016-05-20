import React from 'react';

const Message = (props) => {
  return(
    <div className="message">
      <div className="user-photo"/>
      <div className="message-header">
        <h4>{ props.message.author }</h4>
        <p className="display-time">{ props.message.time }</p>
        <p className="message-text">{ props.message.text }</p>
      </div>
    </div>

  )
};

export default Message;
