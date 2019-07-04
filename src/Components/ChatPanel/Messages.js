import React from 'react'
import './Messages.css'

const Messages = ({ messages }) => {
  const messagesElements = (
    <ul>
      {messages.map((item, index) => (
        <li key={index}>{item.text}</li>
      ))}
    </ul>
  );
  return (
    <div className='Messages'>{messagesElements}</div>
  )
}

export default Messages;
