import React, { useState, useEffect } from 'react';
import API from '@aws-amplify/api';

export function BookingList() {
    const [bookings, setBookings] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        API.endpoint('octankapi').then((endpoint) => console.log(endpoint))
        API.get('octankapi', '/bookings')
            .then((bookingsResponse) => {
                setBookings(bookingsResponse);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log('Error fetching bookings', error);
                setBookings(null);
                setIsLoading(false);
            })
    }, [])

    return (
        <div>
            { isLoading && <p>Loading bookings ...</p> }
            { !isLoading && <div>{JSON.stringify(bookings)}</div>}
        </div>
    );
}
