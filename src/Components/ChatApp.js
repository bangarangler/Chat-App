import React from 'react';
import SidePanel from './SidePanel'
import ChatPanel from './ChatPanel'
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
