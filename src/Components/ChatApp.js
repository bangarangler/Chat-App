import React, {useState} from 'react';
import SidePanel from './SidePanel/SidePanel.js';
import ChatPanel from './ChatPanel/ChatPanel.js';
import './ChatApp.css';
import CurrentRoomContext from '../context/UserContext.js';
import UserContext from '../context/UserContext.js';

const ChatApp = () => {
  const [user, setUser] = useState(null);
  const [currentRoom, setCurrentRoom] = useState(null);
  return (
    <div className="ChatApp">
      <UserContext.Provider value={{user, setUser}}>
        <CurrentRoomContext.Provider value={{currentRoom, setCurrentRoom}}>
          <SidePanel />
          <ChatPanel />
        </CurrentRoomContext.Provider>
      </UserContext.Provider>
    </div>
  );
};

export default ChatApp;
