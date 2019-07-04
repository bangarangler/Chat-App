import React, {useEffect, useState, useRef} from 'react';
import './ChatPanel.css';
import firebase from '../../logic/firebase.js';
import CurrentRoom from './CurrentRoom.js'
import Messages from './Messages.js'
import SendMessage from './SendMessage.js'

function ChatPanel() {
  const [messages, setMessages] = useState([]);
  const refTo_messagesVariable = useRef()
  refTo_messagesVariable.current = messages;
  const messagesRefFirebase = firebase.database().ref('messages');
  const addMessagesListener = () => {
    console.log('addMessagesListener')
    messagesRefFirebase.on('child_added', snap => {
      console.log(snap.val());
      const newMessages = [...refTo_messagesVariable.current]
      newMessages.push(snap.val())
      setMessages(newMessages)
    })
  }
  const removeMessagesListener = () => {
    console.log('removeMessagesListener')
    messagesRefFirebase.off()
  }

  useEffect(() => {
    addMessagesListener()

    return () => removeMessagesListener();
  }, [])
  return (
    <div className="ChatPanel">
    <CurrentRoom />
    <Messages messages={messages}/>
    <SendMessage messagesRefFirebase={messagesRefFirebase}/>
    </div>
  );
}

export default ChatPanel;
