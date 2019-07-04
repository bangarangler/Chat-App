import React, { useContext } from 'react'
import UserContext from '../../context/UserContext.js'

const User = () => {
  const { user } = useContext(UserContext)
  return (
    <div>
    {user.displayName}
    </div>
  )
}

export default User;
