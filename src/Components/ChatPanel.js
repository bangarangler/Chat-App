import React from 'react';
import './ChatPanel.css';

function ChatPanel() {
  return (
    <div className="ChatPanel">
      <div>Room 1</div>
      <div style={{flexGrow: 1}}>
        <ul>
          <li>message 1</li>
          <li>message 2</li>
          <li>message 3</li>
          <li>message 4</li>
        </ul>
      </div>
      <div style={{display: 'flex'}}>
        <input style={{flexGrow: 1}} placeholder="insert message ..." />
            <button>send message</button>
      </div>
    </div>
  );
}

export default ChatPanel;
