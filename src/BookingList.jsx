import React, { useState, useEffect } from 'react';
import API from '@aws-amplify/api';
import moment from 'moment';
// import Auth from '@aws-amplify/auth';
import { Analytics } from 'aws-amplify';
import { BookingListRenderer} from './BookingListRenderer.jsx';

function recordEventWithoutPayload(eventName, userId = "123") {
    Analytics.record({
        data: {
            "event": eventName,
            "timestamp": moment().format('YYYY-MM-DD HH:mm:ss'),
            "userId": userId,
        },
        streamName: 'octankairlinestream-devx'
    }, 'AWSKinesis');
}

export function BookingList() {
    const [bookings, setBookings] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Auth.currentUserInfo
        recordEventWithoutPayload("Loading bookings");
        API.endpoint('octankapi').then((endpoint) => console.log(endpoint))
        API.get('octankapi', '/bookings')
            .then((bookingsResponse) => {
                setBookings(bookingsResponse);
                setIsLoading(false);
                recordEventWithoutPayload("Successfully loaded bookings");
            })
            .catch((error) => {
                console.log('Error fetching bookings', error);
                setBookings(null);
                setIsLoading(false);
                recordEventWithoutPayload("Failed to load bookings");
            })
    }, [])

    return (
        <div className="mt-2">
            { isLoading && <p>Loading bookings ...</p> }
            { !isLoading && <BookingListRenderer items={["Blubb", "Bla", "Foo"]}/>}
        </div>
    );
}
