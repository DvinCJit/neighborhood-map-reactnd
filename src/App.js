import React, { Component } from 'react';
import './App.css';
import L from 'leaflet';
import ListView from './ListView'


class App extends Component {
 constructor(props) {
  super(props);
  this.state = {
    allLocations: [
      {title: 'Fushimi Inari-taisha', position: {lat: 34.966822, lng: 135.772721}},
      {title: 'Kiyomizu-dera', position: {lat: 34.994825, lng: 135.784909}},
      {title: 'Kōzan-ji', position: {lat: 35.060552, lng: 135.678453}},
      {title: 'Mount Kurama', position: {lat: 35.123135, lng: 135.776261}},
      {title: 'Ponto-chō', position: {lat: 35.005107, lng: 135.770954}}
    ],
    markers: [],
    prevMarker: null,
    data: []
  }

 }

  getData(title) {
    fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${title.replace(/\s/g, '_')}&exsentences=1&exlimit=1&origin=*`).then(r => r.json())
    .then(r => {
      let content = r.query.pages[Object.keys(r.query.pages)[0]];
      let extract = content.extract;
      let parser = new DOMParser();
      let html = parser.parseFromString(extract, 'text/html');
      let text = {title: title,
        text: html.querySelector('body p').innerHTML};
      this.setState(prevState => ({data: [...prevState.data, text]}));
      // console.log(this.state.data);
      // console.log(text);
    })
  }
  handleClick = (event) => {
    const marker = event.target;
    const title = event.target.textContent;
    const matchedMarker = this.state.markers.find(m => title === m.options.title);
    // console.log('data title:',this.state.data);
    // console.log(marker.options.title);

    let matchedDataList, textList, matchedData, text;
    if (matchedMarker) {
      matchedDataList = this.state.data.find(i => i.title === title);
      textList = matchedDataList.text;
      // console.log(matchedDataList);
    } else if (marker) {
      matchedData = this.state.data.find(item => item.title === marker.options.title);
      text = matchedData.text;
      // console.log(text);
    }
  
    if(this.state.prevMarker !== null) {
      if(marker && marker._leaflet_id === this.state.prevMarker._leaflet_id)
        return;
      if(matchedMarker && matchedMarker._leaflet_id === this.state.prevMarker._leaflet_id) {
        matchedMarker.bindPopup(textList).openPopup();
        return;
      }
        
      this.setState(prevState => ([
        {prevMarker: prevState.prevMarker._icon.style.width = '25px'},
        {prevMarker: prevState.prevMarker._icon.style.height = '41px'}, 
        {prevMarker: prevState.prevMarker._icon.style.filter = ''}
      ])); 
      // console.log('different markers');
    }
    
    if(matchedMarker) {
      this.setState({prevMarker: matchedMarker});
      // console.log('matchedMarker data:', this.state.data);
      matchedMarker.bindPopup(textList).openPopup();
      matchedMarker._icon.style.width = '34px';
      matchedMarker._icon.style.height = '50px';
      matchedMarker._icon.style.filter = 'hue-rotate(160deg)'; 
    } else if(marker) {
      // console.log('handle click', this.state.data);
      this.setState({prevMarker: marker});
      marker.bindPopup(text);
      marker._icon.style.width = '34px';
      marker._icon.style.height = '50px';
      marker._icon.style.filter = 'hue-rotate(160deg)';
      // console.log('marker on map');
    }
    
  }

  componentWillMount() {
    const markers = this.state.allLocations.map(location => new L.marker([location.position.lat, location.position.lng], {title: location.title}));
    this.setState({markers});

    // console.log('will mount:', this.state.data);
    this.state.allLocations.forEach(loc => {
      let title = loc.title;
      this.getData(title);
    })
  }
    
  componentDidMount() {
    // this.state.markers.forEach(marker => console.log(marker.options.title));     
    // console.log('did mount data', this.state.data);   
    const myMap = L.map('mapid', {
      center: [35.0517, 135.772057],
      zoom: 11
    });
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoianVkaXRocm4iLCJhIjoiY2pqZWZhaWh5Mm83ZjNxbW14YjYwY3BvdSJ9.dzLHt6jQRGlNH9jFAdhkbg', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoianVkaXRocm4iLCJhIjoiY2pqZWZhaWh5Mm83ZjNxbW14YjYwY3BvdSJ9.dzLHt6jQRGlNH9jFAdhkbg'
    }).addTo(myMap);
    // console.log('did mount:', this.state.data);
    this.state.markers.forEach(marker => {
      // console.log('did mount:', this.state.data);
      marker.addTo(myMap);
      marker.bindPopup();
      marker.addEventListener('click', this.handleClick);
    })  
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Neighborhood Map - Kyoto, Japan</h1>
        </header>
        <div id="mapid"></div>
        <ListView handleClick={this.handleClick} markers={this.state.markers} allLocations={this.state.allLocations}/>
      </div>
    );
  }
}

export default App;
