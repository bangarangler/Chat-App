import React, { useContext } from 'react'
import CurrentRoomContext from '../../context/CurrentRoomContext.js'

const Rooms = () => {
  const { setCurrentRoom } = useContext(CurrentRoomContext)
  return (
    <div>
    <ul>
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
    </ul>
    </div>
  )
}

export default Rooms;
