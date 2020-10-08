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

export function BookingList({ currentSearchCriteria }) {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Auth.currentUserInfo
        recordEventWithoutPayload("Loading bookings");
        API.get('octankapi', `/bookings?filter=${currentSearchCriteria}`)
            .then((bookingsResponse) => {
                setBookings(bookingsResponse);
                setIsLoading(false);
                recordEventWithoutPayload("Successfully loaded bookings");
            })
            .catch((error) => {
                console.log('Error fetching bookings', error);
                setBookings([]);
                setIsLoading(false);
                recordEventWithoutPayload("Failed to load bookings");
            })
    }, [currentSearchCriteria])

    return (
        <div className="mt-2">
            { isLoading && <p>Loading bookings for {currentSearchCriteria} ...</p> }
            { !isLoading && <BookingListRenderer items={bookings}/>}
        </div>
    );
}
