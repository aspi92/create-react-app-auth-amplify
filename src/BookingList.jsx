import React, { useState, useEffect } from 'react';
import API from '@aws-amplify/api';
import { Analytics } from 'aws-amplify';

export function BookingList() {
    const [bookings, setBookings] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Analytics.record({
            data: {
                "event": "Loading bookings",
            },
            streamName: 'octankairlinestream-devx'
        }, 'AWSKinesis');
        API.endpoint('octankapi').then((endpoint) => console.log(endpoint))
        API.get('octankapi', '/bookings')
            .then((bookingsResponse) => {
                setBookings(bookingsResponse);
                setIsLoading(false);
                Analytics.record({
                    data: {
                        "event": "Successfully loaded bookings",
                    },
                    streamName: 'octankairlinestream-devx'
                }, 'AWSKinesis');
            })
            .catch((error) => {
                console.log('Error fetching bookings', error);
                setBookings(null);
                setIsLoading(false);
                Analytics.record({
                    data: {
                        "event": "Failed to load bookings",
                    },
                    streamName: 'octankairlinestream-devx'
                }, 'AWSKinesis');
            })
    }, [])

    return (
        <div>
            { isLoading && <p>Loading bookings ...</p> }
            { !isLoading && <div>{JSON.stringify(bookings)}</div>}
        </div>
    );
}
