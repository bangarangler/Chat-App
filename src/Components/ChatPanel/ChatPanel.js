import React, {useEffect, useState, useRef, useContext} from 'react';
import './ChatPanel.css';
import firebase from '../../logic/firebase.js';
import CurrentRoom from './CurrentRoom.js'
import Messages from './Messages.js'
import SendMessage from './SendMessage.js'
import CurrentRoomContext from '../../context/CurrentRoomContext.js'

function ChatPanel() {
  const [messages, setMessages] = useState([]);

  const refTo_messagesVariable = useRef()
  refTo_messagesVariable.current = messages;

  const { currentRoom } = useContext(CurrentRoomContext)

  const messagesRefFirebase = firebase.database().ref('messages');

  const messagesRefFirebasePerRoomId = messagesRefFirebase.child(currentRoom.id)
  const addMessagesListener = () => {
    console.log('addMessagesListener', `currentRoom.id: ${currentRoom.id}`)
    setMessages([])
    messagesRefFirebasePerRoomId.on('child_added', snap => {
      console.log(snap.val());
      const newMessages = [...refTo_messagesVariable.current]
      newMessages.push(snap.val())
      setMessages(newMessages)
    })
  }
  const removeMessagesListener = () => {
    console.log('removeMessagesListener')
    messagesRefFirebasePerRoomId.off()
  }

  useEffect(() => {
    addMessagesListener()

    return () => removeMessagesListener();
  }, [currentRoom.id])
  return (
    <div className="ChatPanel">
    <CurrentRoom />
    <Messages messages={messages}/>
    <SendMessage messagesRefFirebasePerRoomId={messagesRefFirebasePerRoomId}/>
    </div>
  );
}

export default ChatPanel;
