import React, { useContext } from 'react'
import CurrentRoomContext from '../../context/CurrentRoomContext.js'

const CurrentRoom = ({messages}) => {
  const { currentRoom } = useContext(CurrentRoomContext)
  const distinctUsers = [...new Set(messages.map(m => m.user.uid))].length;
  return (
    <div>
      <p>{currentRoom.name}</p>
        <p>({distinctUsers}) users</p>
    </div>
  )
}

export default CurrentRoom;
