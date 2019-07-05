import React, { useState, useContext, useEffect, useRef } from 'react';
import CurrentRoomContext from '../../context/CurrentRoomContext.js';
import firebase from '../../logic/firebase.js';

const Rooms = () => {
  const {setCurrentRoom} = useContext(CurrentRoomContext);
  const [rooms, setRooms] = useState([])
  const roomsRefFirebase = firebase.database().ref('rooms');

  const refTo_roomsVariable = useRef()
  refTo_roomsVariable.current = rooms;

  const addRoom = () => {
    console.log('addRoom');
    const roomId = roomsRefFirebase.push().key;
    const newRoom = {
      id: roomId,
      name: 'room2', //TODO: replace with data from modal
      description: 'desc2', // TODO: replace with data from modal
    };

    roomsRefFirebase
      .child(roomId)
      .set(newRoom)
      .then(room => console.log(`success : ${room}`))
      .catch(err => console.log(`error : ${err}`));
  };

  const addRoomsListener = () => {
    console.log(`rooms listener added`)
    roomsRefFirebase.on('child_added', snap => {
      let newRooms = [...refTo_roomsVariable.current, snap.val()]
      setRooms(newRooms)
    })
  }

  const removeRoomsListener = () => {
    console.log('rooms listener removed')
    roomsRefFirebase.off()
  }

  useEffect(() => {
    addRoomsListener();

    return () => removeRoomsListener()
  }, [])

  const roomsElements = (
  <ul>
      {rooms.map((it, index) => <li key={index}>{it.name}</li>)}
  </ul>
  )

  return (
    <div>
      <p>rooms ({rooms.length})</p>
      <button onClick={addRoom}>Add Room</button>
        {roomsElements}
        {/*}<ul>
        <li onClick={() => setCurrentRoom({
        id: 'idroom1',
        name: 'room1',
        description: 'desc1'
      })}>Room 1</li>
    <li onClick={() => setCurrentRoom({
      id: 'idroom2',
      name: 'room2',
      description: 'desc2'
    })}>Room 2</li>
      </ul>*/}
    </div>
  );
};

export default Rooms;
