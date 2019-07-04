import React from 'react';
import './Messages.css';
import moment from 'moment'

const Messages = ({messages}) => {
  const messagesElements = (
    <ul>
      {messages.map((item, index) => (
        <li key={index}>
          {item.text}, {item.user.displayName}, {moment(item.timestamp).fromNow()}
        </li>
      ))}
    </ul>
  );
  return <div className="Messages">{messagesElements}</div>;
};

export default Messages;
