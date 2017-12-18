import React, { Component } from 'react';
import NavBar from '../NavBar';
import DashboardSearchBar from './components/dashboardsearchbar'
import DashboardPostSelectorBar from './components/dashboardpostselectorbar'
import DashboardResults from './components/dashboardresults';

class Dashboard extends Component {

  render() {
    return(
      <div>
        <NavBar />
        <DashboardSearchBar />
        <DashboardPostSelectorBar />
        <DashboardResults />
      </div>
    );
  }

}

export default Dashboard;
