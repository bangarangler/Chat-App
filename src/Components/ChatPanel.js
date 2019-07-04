import React from 'react';
import './ChatPanel.css'

function ChatPanel() {
  return (
    <div className='ChatPanel'>
    <div>Room 1</div>
    <div style={{flexGrow: 1}}>Messages</div>
    <div>Send Messages</div>
    </div>
  );
}


export default ChatPanel;
