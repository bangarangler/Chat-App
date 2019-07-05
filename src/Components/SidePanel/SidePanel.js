import React from 'react';
import './SidePanel.css'
import UserMenu from './UserMenu.js'
import Rooms from './Rooms.js'
import { Header, Icon } from 'semantic-ui-react'
import { appName, appIconName } from '../../logic/Constants.js'

const SidePanel = () => {
  return (
    <div className='SidePanel'>
    <Header inverted as='h2'>
    <Icon name={appIconName} />
      {appName}</Header>
      <UserMenu />
    <Rooms />
    </div>
  );
};

export default SidePanel;
