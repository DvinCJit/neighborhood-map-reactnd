import React, { Component } from 'react';
import L from 'leaflet'
import './App.css';

class MapContainer extends Component {

    componentDidMount() {
        const myMap = L.map('mapid', {
        center: [34.835651, 135.825367],
        zoom: 10
        });
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoianVkaXRocm4iLCJhIjoiY2pqZWZhaWh5Mm83ZjNxbW14YjYwY3BvdSJ9.dzLHt6jQRGlNH9jFAdhkbg', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox.streets',
          accessToken: 'pk.eyJ1IjoianVkaXRocm4iLCJhIjoiY2pqZWZhaWh5Mm83ZjNxbW14YjYwY3BvdSJ9.dzLHt6jQRGlNH9jFAdhkbg'
        }).addTo(myMap);

        let marker;
        const markers = this.props.allLocations.map(location => {
            marker = new L.marker([location.position.lat, location.position.lng]).addTo(myMap);
            marker.bindPopup("<b>Hello world!</b><br>I am a popup.");
        })
    }

    render() {
        return <div id="mapid"></div>
    }
}

export default MapContainer