import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'

class ListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            previousMarker: null
        }
    }
    
    updateQuery = (query) => {
        this.setState({query})
    }

    handleOnMouseOver = (title) => {
        title.style.fontSize = '20px';
    }

    handleOnMouseOut = (title) => {
        title.style.fontSize = '16px';
    }
        
    render() {
        const {allLocations, handleClick} = this.props;
        const {query} = this.state;
        let filteredPlaces;

        /* Filtering with RegExps as explained in the Udacity FEND course here: 
        https://github.com/udacity/reactnd-contacts-complete */

        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i');
            filteredPlaces = allLocations.filter(place => match.test(place.title))
        } else {
            filteredPlaces = allLocations;
        }

        return (
            <div className='list-view'>
                <input 
                    role='search'
                    aria-label='locations-filter'
                    name='textfield'
                    id='search-locations'
                    type='text' 
                    placeholder='Search location'
                    value={this.state.query}
                    onChange={event => this.updateQuery(event.target.value)} />
                <ul className='locations-list'>
                    {filteredPlaces.map(item => (
                        <li tabIndex='0' 
                            role='button' 
                            key={item.title} 
                            onMouseOver={event => this.handleOnMouseOver(event.target)} 
                            onMouseOut={event => this.handleOnMouseOut(event.target)} 
                            onClick={(event) => handleClick(event)} 
                            onKeyPress={(event) => handleClick(event)}>{item.title}
                        </li>
                    ))} 
                </ul>
            </div>
        )
    }
}

export default ListView