import React, { Component } from 'react';

import NewPostButton from '../../components/NewPostButton';
import NotificationsBar from '../NotificationsBar';

class NavBar extends Component {

  render() {
    return(
      <div>
        This is the NavBar
        <NotificationsBar />
        <NewPostButton />
      </div>
    )
  }

}

export default NavBar;
