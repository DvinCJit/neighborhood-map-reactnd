import React, { Component } from 'react';
import './App.css';
import L from 'leaflet';
import ListView from './ListView'
import { allLocations, mapboxAPITiles, mapboxAccessToken, fetchTiles, fetchWiki } from './constants';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allLocations,
      markers: [],
      prevMarker: null,
      data: []
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
    L.tileLayer(mapboxAPITiles + '/v4/{id}/{z}/{x}/{y}.png?' + mapboxAccessToken, {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> '
      + 'contributors<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' 
      + 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: mapboxAccessToken
    }).addTo(myMap)
    // Solution: https://stackoverflow.com/questions/24342683/leaflet-tile-loading-error-event
    .on('tileerror', (error) => {
      console.log(error);
      window.alert('No network connection. We were unable to access the map tile layer');
    });

    this.state.markers.forEach(marker => {
      marker.addTo(myMap);
      marker.bindPopup();
      marker.addEventListener('click', this.handleClick);
      marker.addEventListener('keypress', this.handleClick);
    })  
  }

  /*
  * Gets the data from Wikipedia through MediaWiki API 
  * and stores it in the 'data' variable on state. 
  * Errors with the requested data are handled too
  */

  getData(title) {
    fetch(fetchWiki(title))
    .then(r => r.json())
    .then(r => {
      const content = r.query.pages[Object.keys(r.query.pages)[0]];
      const extract = content.extract;
      const parser = new DOMParser();
      const html = parser.parseFromString(extract, 'text/html');
      const text = {
        title: title,
        text: html.querySelector('body p').innerHTML
      };
      
      this.setState(prevState => ({data: [...prevState.data, text]}));
    }).catch((error) => {
      console.log('Request error', error);
      window.alert('Sorry! Data could not be loaded. Check your internet connection and try again.');
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

  render() {
    return (
      <div className="App">
        <header className="App-header" role="banner">
            <h1 className="App-title">
              Neighborhood Map - Kyoto, Japan
            </h1>
        </header>
        <div id="mapid" role="application" aria-label="neighborhood-map"></div>
        <ListView handleClick={this.handleClick} markers={this.state.markers} allLocations={this.state.allLocations}/>
      </div>
    );
  }
}

export default App;
