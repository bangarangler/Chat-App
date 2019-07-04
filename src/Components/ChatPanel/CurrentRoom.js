import React, { useContext } from 'react'
import CurrentRoomContext from '../../context/CurrentRoomContext.js'

const CurrentRoom = () => {
  const { currentRoom } = useContext(CurrentRoomContext)
  return (
    <div>
    {currentRoom.name}
    </div>
  )
}

export default CurrentRoom;
