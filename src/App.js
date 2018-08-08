import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import L from 'leaflet';
import MapContainer from './MapContainer';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Neighborhood Map</h1>
        </header>
        <MapContainer />
      </div>
    );
  }
}

export default App;
