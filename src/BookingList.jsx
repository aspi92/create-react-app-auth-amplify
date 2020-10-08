import React, { useState, useEffect } from 'react';
import API from '@aws-amplify/api';
import moment from 'moment';
import { Analytics } from 'aws-amplify';
import { BookingListRenderer} from './BookingListRenderer.jsx';

function recordEventWithPayload(eventName, payload, userId) {
    Analytics.record({
        data: {
            event: eventName,
            payload,
            timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
            userId: userId,
        },
        streamName: 'octankairlinestream-devx'
    }, 'AWSKinesis');
}

function recordEventWithoutPayload(eventName, userId) {
    Analytics.record({
        data: {
            event: eventName,
            timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
            userId: userId,
        },
        streamName: 'octankairlinestream-devx'
    }, 'AWSKinesis');
}

export function BookingList({userName, currentSearchCriteria }) {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        recordEventWithPayload("search", currentSearchCriteria, userName);
        API.get('octankapi', `/bookings?filter=${currentSearchCriteria}`)
            .then((bookingsResponse) => {
                setBookings(bookingsResponse);
                setIsLoading(false);
                recordEventWithoutPayload("list bookings", userName);
            })
            .catch((error) => {
                console.log('Error fetching bookings', error);
                setBookings([]);
                setIsLoading(false);
                recordEventWithoutPayload("failed listing bookings", userName);
            });
    }, [currentSearchCriteria])

    return (
        <div className="mt-2">
            { isLoading && <p>Loading bookings for {currentSearchCriteria} ...</p> }
            { !isLoading && <BookingListRenderer items={bookings}/> }
        </div>
    );
}
