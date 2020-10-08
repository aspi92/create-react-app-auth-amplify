import React, {useState} from 'react';

import { BookingList } from './BookingList.jsx';

export function BookingForm({ userName }) {
    const [searchInput, setSearchInput] = useState("");
    const [currentSearchCriteria, setCurrentSearchCriteria] = useState("");
    
    if (!userName) {
      return null;
    }
    
    return (
        <div className="card">
            <div className="card-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="searchInput">Search for a booking:</label>
                    <input type="text"
                    value={searchInput}
                    onChange={event => setSearchInput(event.target.value)}
                    className = "form-control"
                    id = "searchInput"
                    placeholder="Enter a city" />
                    <small id="searchHelp" className="form-text text-muted">Please choose either: New York, Dallas, Chicago, San Franciso, or, Seattle</small>
                  </div>
                  <button type="submit" className="btn btn-primary" onClick={(event) => {
                    event.preventDefault();
                    setCurrentSearchCriteria(searchInput)}
                  }>Search</button>
                </form>
            
                <BookingList userName={userName} currentSearchCriteria={currentSearchCriteria}/>
            </div>
        </div>
    );
}