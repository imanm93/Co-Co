import React, { Component } from 'react';

import ButtonNewPost from '../../components/ButtonNewPost';
import NotificationsBar from '../NotificationsBar';

class NavBar extends Component {

  render() {
    return(
      <div>
        This is the NavBar
        <NotificationsBar />
        <ButtonNewPost />
      </div>
    )
  }

}

export default NavBar;
