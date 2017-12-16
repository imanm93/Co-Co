import React, { Component } from 'react';
import Routes from './routes';
import { ConnectedRouter } from 'react-router-redux';

export default class App extends Component {
  render() {
    return (
      <ConnectedRouter className="app" history={this.props.history}>
        <Routes />
      </ConnectedRouter>
    );
  }
}
