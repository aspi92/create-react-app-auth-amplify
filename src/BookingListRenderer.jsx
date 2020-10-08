import React from 'react';

export function BookingListRenderer({ items }) {
    return (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Booking ID</th>
              <th scope="col">City</th>
              <th scope="col">Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
                <tr key={item.bookingId}>
                  <td>{ item.bookingId }</td>
                  <td>{ item.city }</td>
                  <td>{ item.paymentStatus }</td>
                </tr>
            ))}
          </tbody>
        </table>
    );
}
