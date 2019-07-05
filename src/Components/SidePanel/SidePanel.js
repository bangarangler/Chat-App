import React from 'react';
import './SidePanel.css'
import User from './User.js'
import Rooms from './Rooms.js'

const SidePanel = () => {
  return (
    <div className='SidePanel'>
      <h2>ChatApp</h2>
      <User />
    <Rooms />
    </div>
  );
};

export default SidePanel;
