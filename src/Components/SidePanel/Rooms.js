import React, { useState, useContext, useEffect, useRef } from 'react';
import CurrentRoomContext from '../../context/CurrentRoomContext.js';
import firebase from '../../logic/firebase.js';
import AddRoomModal from './AddRoomModal.js'
import './Rooms.css'
import Spinner from '../Common/Spinner.js'

const Rooms = () => {
  const {setCurrentRoom} = useContext(CurrentRoomContext);
  const [rooms, setRooms] = useState([])
  const [roomsLoaded, setRoomsLoaded] = useState(false)
  const roomsRefFirebase = firebase.database().ref('rooms');

  const refTo_roomsVariable = useRef()
  refTo_roomsVariable.current = rooms;


  const addRoomsListener = () => {
    console.log(`rooms listener added`)
    roomsRefFirebase.on('child_added', snap => {
      let newRooms = [...refTo_roomsVariable.current, snap.val()]
      setRooms(newRooms)
      setRoomsLoaded(true)
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

  const roomsElements = roomsLoaded ? (
  <ul>
      {rooms.map((it, index) => <li onClick={() => setCurrentRoom(rooms[index])} key={index}>{it.name}</li>)}
  </ul>
  ) : <Spinner />

  return (
    <div className="Rooms">
      <div className="rooms-header">
      <h4>rooms ({rooms.length})</h4>
    <AddRoomModal roomsRefFirebase={roomsRefFirebase}/>
      </div>
        {roomsElements}
    </div>
  );
};

export default Rooms;
