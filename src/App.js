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

  /*
  * Gets the data from Wikipedia through MediaWiki API 
  * and stores it in the 'data' variable on state. 
  * Errors with the requested data are handled too
  */

  getData(title) {
    fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${title.replace(/\s/g, '_')}&exsentences=1&exlimit=1&origin=*`).then(r => r.json())
    .then(r => {
      let content = r.query.pages[Object.keys(r.query.pages)[0]];
      let extract = content.extract;
      let parser = new DOMParser();
      let html = parser.parseFromString(extract, 'text/html');
      let text = {
        title: title,
        text: html.querySelector('body p').innerHTML
      };
      
      this.setState(prevState => ({data: [...prevState.data, text]}));
    }).catch((error) => {
      console.log('Request error', error);
      window.alert('Sorry! Data could not be loaded.');
    })
  }

  /*
  * Handles a click event for a marker or a list view item (or keypress  
  * event when using a keyboard to move around the page)
  */

  handleClick = (event) => {

    // Variables

    let matchedDataList, 
        matchedData,
        textList,
        text, 
        source, 
        src;

    const marker = event.target;
    const title = event.target.textContent;
    const matchedMarker = this.state.markers.find(m => title === m.options.title);

    /* 
    * Used different variables depending on whether the user 
    * has clicked or keypressed a list view item or a marker in the map
    */

    if (matchedMarker) {
      matchedDataList = this.state.data.find(i => i.title === title);
      textList = matchedDataList.text;
      src = '<a role="link" id="src-link" href="https://en.wikipedia.org/wiki/' + title + '"target="_blank">Source (Wikipedia)</a>';
    } else if (marker) {
      matchedData = this.state.data.find(item => item.title === marker.options.title);
      text = matchedData.text;
      source = '<a role="link" id="source-link" href="https://en.wikipedia.org/wiki/' + marker.options.title + '"target="_blank">Source (Wikipedia)</a>';
    }

    // Reset all markers to original styles

    if(this.state.prevMarker !== null) {
      if(marker && marker._leaflet_id === this.state.prevMarker._leaflet_id)
        return;
      if(matchedMarker && matchedMarker._leaflet_id === this.state.prevMarker._leaflet_id) {
        matchedMarker.bindPopup(textList + '<br>' + src).openPopup();
        return;
      }
        
      this.setState(prevState => ([
        {prevMarker: prevState.prevMarker._icon.style.width = '25px'},
        {prevMarker: prevState.prevMarker._icon.style.height = '41px'}, 
        {prevMarker: prevState.prevMarker._icon.style.filter = ''}
      ])); 
    }
    
    /* 
    * Add clicked or selected marker to 'prevMarker' on state,
    * change marker styles when selected and modify tab order 
    * to allow users to interact with popup links and return to 
    * last active element on list view or map
    */

    if(matchedMarker) {
      this.setState({prevMarker: matchedMarker});
      
      matchedMarker._icon.style.width = '34px';
      matchedMarker._icon.style.height = '50px';
      matchedMarker._icon.style.filter = 'hue-rotate(160deg)';
      
      matchedMarker.bindPopup(textList + '<br>' + src)
      .on('popupclose', () => window.lastActive.focus())
      .openPopup();
      window.lastActive = document.activeElement;
      document.getElementById('src-link').focus();

    } else if(marker) {
      this.setState({prevMarker: marker});

      marker._icon.style.width = '34px';
      marker._icon.style.height = '50px';
      marker._icon.style.filter = 'hue-rotate(160deg)';
      
      marker.bindPopup(text + '<br>' + source)
      .on('popupclose', () => window.lastActive.focus())
      .openPopup();;
      window.lastActive = document.activeElement;
      document.getElementById('source-link').focus();
    }
  }

  // Create markers and load API data

  componentWillMount() {
    const markers = this.state.allLocations.map(location => new L.marker(
      [location.position.lat, location.position.lng], 
      {title: location.title, alt: location.title}));
    this.setState({markers});

    this.state.allLocations.forEach(loc => {
      let title = loc.title;
      this.getData(title);
    });
  }
    
  // Initialize map, markers and popups

  componentDidMount() {  
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

    this.state.markers.forEach(marker => {
      marker.addTo(myMap);
      marker.bindPopup();
      marker.addEventListener('click', this.handleClick);
      marker.addEventListener('keypress', this.handleClick);
    })  
  }

  render() {
    return (
      <div className="App">
        <header className="App-header" role="banner">
          <nav>
            <h1 className="App-title">
              <a href="/">Neighborhood Map - Kyoto, Japan</a>
            </h1>
          </nav>
        </header>
        <div id="mapid" role="application" aria-label="neighborhood-map"></div>
        <ListView handleClick={this.handleClick} markers={this.state.markers} allLocations={this.state.allLocations}/>
      </div>
    );
  }
}

export default App;
