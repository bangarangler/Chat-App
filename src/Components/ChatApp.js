import React from 'react';
import SidePanel from './SidePanel/SidePanel.js'
import ChatPanel from './ChatPanel/ChatPanel.js'
import './ChatApp.css'

const ChatApp = () => {
  return (
    <div className='ChatApp'>
      <SidePanel />
      <ChatPanel />
    </div>
  );
}

export default ChatApp;
