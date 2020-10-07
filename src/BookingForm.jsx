import React from 'react';

import { BookingList } from './BookingList.jsx';

export function BookingForm() {
    return (
        <div class="card">
            <div div class="card-body">
                <form>
                  <div class="form-group">
                    <label for="searchInput">Search for a booking:</label>
                    <input type="text" class="form-control" id="searchInput" placeholder="Enter a city" />
                    <small id="searchHelp" class="form-text text-muted">Please choose either: Rome, London, Birmingham, Berlin, Tel Aviv, or, Amsterdam </small>
                  </div>
                  <button type="submit" class="btn btn-primary">Search</button>
                </form>
            
                <BookingList />
            </div>
        </div>
    );
}