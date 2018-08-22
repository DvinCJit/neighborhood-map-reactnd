import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'

class ListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ''
        }
    }
    
    updateQuery = (query) => {
        if(query !== this.state.query) {
            this.setState({
                query
            })
        } 
    }

    handleMouseInOut = (title) => {
        if(title.style.fontSize === '20px') {
            return title.style.fontSize === '16px';
        } else {
            return title.style.fontSize === '20px';
        }
    }

    handleOnMouseOver = (title) => {
        title.style.fontSize = '20px';
    }

    handleOnMouseOut = (title) => {
        title.style.fontSize = '16px';
    }
        
    render() {
        const {state: {query}, props: {allLocations, handleClick}} = this;
        const filteredPlaces = (() => {
            if (query) {
                const match = new RegExp(escapeRegExp(query), 'i');
                return allLocations.filter(place => match.test(place.title))
            } else {
                return allLocations;
            }
        })();

        return (
            <div className='list-view'>
                <input 
                    role='search'
                    aria-label='locations-filter'
                    name='textfield'
                    id='search-locations'
                    type='text' 
                    placeholder='Search location'
                    value={query}
                    onChange={event => this.updateQuery(event.target.value)} />
                <ul className='locations-list'>
                    {filteredPlaces.map(item => (
                        <li tabIndex='0' 
                            role='button' 
                            key={item.title} 
                            onMouseOver={event => this.handleMouseInOut(event.target)} 
                            onMouseOut={event => this.handleMouseInOut(event.target)} 
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