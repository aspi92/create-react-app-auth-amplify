import React from 'react';

export function BookingListRenderer({ items }) {
    return (
        <ul class="list-group">
            {items.map(() => <li class="list-group-item">Cras justo odio</li>)}
        </ul>
    );
}
