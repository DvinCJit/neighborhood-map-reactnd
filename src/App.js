import React, { Component } from 'react';
import './App.css';
import L from 'leaflet';
//import MapContainer from './MapContainer';
// import locations from './locations.json';
import ListView from './ListView'



class App extends Component {
 constructor(props) {
  super(props)
  this.state = {
    allLocations: [
      {title: 'Demachi Futaba', position: {lat: 35.0301, lng: 135.769618}},
      {title: 'Fushimi Inari-taisha', position: {lat: 34.966822, lng: 135.772721}},
      {title: 'Kamikata Onsen Ikkyu', position: {lat: 34.835651, lng: 135.825367}},
      {title: 'Kiyomizu-dera', position: {lat: 34.994825, lng: 135.784909}},
      {title: 'Nara Park', position: {lat: 34.685047, lng: 135.843012}}
    ],
    markers: [],
    prevMarker: null
  }
 }

  handleClick = (event) => {
    const marker = event.target;
    const title = event.target.textContent;
    const matchedMarker = this.state.markers.find(m => title === m.options.title);
    console.log('marker clicked:', marker);
    if(this.state.prevMarker !== null) {
      if(marker && marker._leaflet_id === this.state.prevMarker._leaflet_id)
        return;
      if(matchedMarker && matchedMarker._leaflet_id === this.state.prevMarker._leaflet_id) {
        matchedMarker.openPopup();
        return;
      }
        
      this.setState(prevState => ([
        {prevMarker: prevState.prevMarker._icon.style.width = '25px'},
        {prevMarker: prevState.prevMarker._icon.style.height = '41px'}, 
        {prevMarker: prevState.prevMarker._icon.style.filter = ''}
      ])); 
      console.log('different markers');
    }

    if(matchedMarker) {
      this.setState({prevMarker: matchedMarker});
      matchedMarker.openPopup();
      matchedMarker._icon.style.width = '34px';
      matchedMarker._icon.style.height = '50px';
      matchedMarker._icon.style.filter = 'hue-rotate(160deg)'; 
    } else if(marker) {
      this.setState({prevMarker: marker});
      marker._icon.style.width = '34px';
      marker._icon.style.height = '50px';
      marker._icon.style.filter = 'hue-rotate(160deg)';
      console.log('marker on map');
    }
    

  }

  componentWillMount() {
    const markers = this.state.allLocations.map(location => new L.marker([location.position.lat, location.position.lng], {title: location.title}));
    console.log(markers);
    this.setState({markers});

  }
    
  componentDidMount() {
        console.log('Markers from componentDidMount:', this.state.markers);
        this.state.markers.forEach(marker => console.log(marker.options.title));
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

    

    this.state.markers.forEach(marker => {
      marker.addTo(myMap);
      marker.bindPopup("<b>Hello world!</b><br>I am a popup.");
      marker.addEventListener('click', this.handleClick);
    })  
  }

  updatePrevMarker = (prevMarker) => {this.setState({prevMarker})};

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">NARA & KYOTO</h1>
        </header>
        <div id="mapid"></div>
        <ListView handleClick={this.handleClick} markers={this.state.markers} allLocations={this.state.allLocations}/>
      </div>
    );
  }
}

export default App;
