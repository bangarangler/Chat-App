import React from 'react'
import './SendMessage.css'

const SendMessage = ({ messagesRefFirebase }) => {
  return (
    <div className='SendMessage'>
      <input placeholder="insert message ..." />
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
  )
}

export default SendMessage;
