import React, { Component } from 'react';
import L from 'leaflet'
import './App.css';

class MapContainer extends Component {
    
    componentDidMount() {
        const myMap = L.map('mapid', {
        center: [34.994825, 135.784909],
        zoom: 13
        });
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoianVkaXRocm4iLCJhIjoiY2pqZWZhaWh5Mm83ZjNxbW14YjYwY3BvdSJ9.dzLHt6jQRGlNH9jFAdhkbg', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox.streets',
          accessToken: 'pk.eyJ1IjoianVkaXRocm4iLCJhIjoiY2pqZWZhaWh5Mm83ZjNxbW14YjYwY3BvdSJ9.dzLHt6jQRGlNH9jFAdhkbg'
        }).addTo(myMap);
  }
    render() {
        return <div id="mapid"></div>
    }
}

export default MapContainer