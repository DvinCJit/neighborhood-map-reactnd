import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import L from 'leaflet';
import MapContainer from './MapContainer';
// import locations from './locations.json';

const allLocations = [
        {title: 'Demachi Futaba', position: {lat: 35.0301, lng: 135.769618}},
        {title: 'Fushimi Inari-taisha', position: {lat: 34.966822, lng: 135.772721}},
        {title: 'Kamikata Onsen Ikkyu', position: {lat: 34.835651, lng: 135.825367}},
        {title: 'Kiyomizu-dera', position: {lat: 34.994825, lng: 135.784909}},
        {title: 'Nara Park', position: {lat: 34.685047, lng: 135.843012}}
    ]
    
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Neighborhood Map</h1>
        </header>
        <MapContainer allLocations={allLocations} />
      </div>
    );
  }
}

export default App;
