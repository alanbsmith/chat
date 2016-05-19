import React from 'react';

const Message = (props) => {
  return(
    <div className="thumbnail">
      <div className="caption">
        <p>{props.text}</p>
      </div>
    </div>
  )
};

export default Message;
