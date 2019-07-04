import React, {useContext, useState} from 'react';
import UserContext from '../../context/UserContext.js';
import CurrentRoomContext from '../../context/CurrentRoomContext.js';
import './SendMessage.css';
import firebase from '../../logic/firebase.js'

const SendMessage = ({messagesRefFirebase}) => {
  const {user} = useContext(UserContext);
  const {currentRoom} = useContext(CurrentRoomContext);
  const [messageText, setMessageText] = useState('');
  const createMessage = messageId => ({
    id: messageId,
    text: messageText,
    roomId: currentRoom.id,
    timestamp: firebase.database.ServerValue.TIMESTAMP,
    user,
  });

  const messageId = messagesRefFirebase.push().key;
  const newMessage = createMessage(messageId);

  return (
    <div className="SendMessage">
      <input
        onChange={e => setMessageText(e.target.value)}
        placeholder="insert message ..."
        value={messageText}
      />
      <button
        onClick={() =>
          messagesRefFirebase
            .child(messageId)
            .set(newMessage)
            .then(msg => {
              console.log(`set success`);
              setMessageText('');
            })
            .catch(err => console.log(`set error: ${err}`))
        }>
        send message
      </button>
    </div>
  );
};

export default SendMessage;
