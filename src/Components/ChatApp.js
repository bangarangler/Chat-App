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
  const [currentRoom, setCurrentRoom] = useState(null);
  return (
    <div className="ChatApp">
      <UserContext.Provider value={{user, setUser}}>
        <CurrentRoomContext.Provider value={{currentRoom, setCurrentRoom}}>
          <SidePanel />
            {currentRoom ? <ChatPanel /> : <h3>Please choose a chat room</h3>}
        </CurrentRoomContext.Provider>
      </UserContext.Provider>
    </div>
  );
};

export default ChatApp;
