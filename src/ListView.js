import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'

class ListView extends Component {
    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({query})
    }

    render() {
        const {allLocations} = this.props;
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
                    className='search-locations'
                    type='text' 
                    placeholder='Search location'
                    value={this.state.query}
                    onChange={event => this.updateQuery(event.target.value)} />
                <ul className='locations-list'>
                    {filteredPlaces.map(item => (
                        <li>{item.title}</li>
                    ))} 
                </ul>
            </div>
        )
    }
}

export default ListView