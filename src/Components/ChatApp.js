import React, {useState} from 'react';
import SidePanel from './SidePanel/SidePanel.js';
import ChatPanel from './ChatPanel/ChatPanel.js';
import './ChatApp.css';
import CurrentRoomContext from '../context/CurrentRoomContext.js';
import UserContext from '../context/UserContext.js';

const ChatApp = () => {
  // TODO: use null after user login
  const [user, setUser] = useState({
    displayName: "Nathan",
    photoURL: "",
    uid: "id nathan"
  });
  //TODO: use null after room selected logic
  const [currentRoom, setCurrentRoom] = useState({
    id: 'id1',
    name: 'room1',
    description: 'room1 description'
  });
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
