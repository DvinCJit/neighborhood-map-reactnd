import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'

class ListView extends Component {
    state = {
        query: '',
        previousMarker: null
    }

    updateQuery = (query) => {
        this.setState({query})
    }

    // handleClick = (title) => {
    //     console.log('The link was clicked.', title);

    //     const matchedMarker = this.props.markers.find(m => title === m.options.title);
        
    //     if(this.state.previousMarker !== null) {
    //         if(matchedMarker._leaflet_id === this.state.previousMarker._leaflet_id)
    //             return;

    //         this.setState(prevState => ([
    //             {previousMarker: prevState.previousMarker._icon.style.width = '25px'},
    //             {previousMarker: prevState.previousMarker._icon.style.height = '41px'}, 
    //             {previousMarker: prevState.previousMarker._icon.style.filter = ''}
    //         ])); 
    //         console.log('different markers');
    //         console.log('previousMarker width:', this.state.previousMarker._icon.style.width);
    //     }

    //     this.setState({previousMarker: matchedMarker});

    //     matchedMarker.openPopup();
    //     matchedMarker._icon.style.width = '34px';
    //     matchedMarker._icon.style.height = '50px';
    //     matchedMarker._icon.style.filter = 'hue-rotate(160deg)'; 
    //     console.log(matchedMarker._leaflet_id);
    //     console.log('previousMarker:', this.state.previousMarker);
        
    // }

    handleOnMouseOver = (title) => {
        // console.log('mouseover:', title);
        title.style.fontSize = '20px';
    }

    handleOnMouseOut = (title) => {
        title.style.fontSize = '16px';
    }
        
    render() {
        const {markers, allLocations, handleClick} = this.props;
        const {query} = this.state;
        let filteredPlaces;
        // console.log(this.props.markers);
        // this.props.markers.forEach(marker => console.log(marker.options.title));
        /* Filtering with RegExps as explained in the Udacity FEND course here: 
        https://github.com/udacity/reactnd-contacts-complete */
        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i');
            filteredPlaces = allLocations.filter(place => match.test(place.title))
        } else {
            filteredPlaces = allLocations;
        }

        // console.log(filteredPlaces);
        return (
            <div className='list-view'>
                <input 
                    className='search-locations'
                    type='text' 
                    placeholder='Search location'
                    value={this.state.query}
                    onChange={event => this.updateQuery(event.target.value)} />
                <ul className='locations-list'>
                    {filteredPlaces.map(item => (
                        <li key={item.title} onMouseOver={event => this.handleOnMouseOver(event.target)} onMouseOut={event => this.handleOnMouseOut(event.target)} onClick={(event) => handleClick(event)} >{item.title}</li>
                    ))} 
                </ul>
            </div>
        )
    }
}

export default ListView