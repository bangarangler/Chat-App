import React, {useContext} from 'react';
import CurrentRoomContext from '../../context/CurrentRoomContext.js';
import firebase from '../../logic/firebase.js';

const Rooms = () => {
  const {setCurrentRoom} = useContext(CurrentRoomContext);
  const roomsRefFirebase = firebase.database().ref('rooms');

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
  return (
    <div>
      <p>rooms (...)</p>
      <button onClick={addRoom}>Add Room</button>
      <ul>
        {/*<li onClick={() => setCurrentRoom({
        id: 'idroom1',
        name: 'room1',
        description: 'desc1'
      })}>Room 1</li>
    <li onClick={() => setCurrentRoom({
      id: 'idroom2',
      name: 'room2',
      description: 'desc2'
    })}>Room 2</li>*/}
      </ul>
    </div>
  );
};

export default Rooms;
