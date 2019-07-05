import React, {useState} from 'react';
import SidePanel from './SidePanel/SidePanel.js';
import ChatPanel from './ChatPanel/ChatPanel.js';
import './ChatApp.css';
import CurrentRoomContext from '../context/CurrentRoomContext.js';

const ChatApp = () => {
  const [currentRoom, setCurrentRoom] = useState(null);
  return (
    <div className="ChatApp">
      <CurrentRoomContext.Provider value={{currentRoom, setCurrentRoom}}>
        <SidePanel />
        {currentRoom ? <ChatPanel /> : <h3>Please choose a chat room</h3>}
      </CurrentRoomContext.Provider>
    </div>
  );
};

export default ChatApp;
