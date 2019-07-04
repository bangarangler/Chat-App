import React, {useEffect, useState, useRef} from 'react';
import './ChatPanel.css';
import firebase from '../logic/firebase.js';

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
  const messagesElements = (
    <ul>
      {messages.map((item, index) => (
        <li key={index}>{item.text}</li>
      ))}
    </ul>
  );
  return (
    <div className="ChatPanel">
      <div>Room 1</div>
      <div style={{flexGrow: 1}}>{messagesElements}</div>
      <div style={{display: 'flex'}}>
        <input style={{flexGrow: 1}} placeholder="insert message ..." />
        <button
          onClick={() =>
            messagesRefFirebase
              .child('id2')
              .set({text: 'some text 2'})
              .then(msg => console.log(`set success : ${msg}`))
              .catch(err => console.log(`set error: ${err}`))
          }>
          send message
        </button>
      </div>
    </div>
  );
}

export default ChatPanel;
