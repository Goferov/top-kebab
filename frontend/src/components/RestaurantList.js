import React, { useEffect, useState } from 'react';
import { getRestaurants } from '../services/api';

export default function RestaurantList() {
    const [restaurants, setRestaurants] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getRestaurants()
            .then(response => {
                setRestaurants(response.data.data || response.data);
            })
            .catch(err => {
                setError(err.message);
            });
    }, []);

    if (error) return <p>Błąd: {error}</p>;

    return (
        <div>
            <h2>Lista restauracji</h2>
            <ul>
                {restaurants.map((restaurant) => (
                    <li key={restaurant.id}>
                        {restaurant.name} - {restaurant.address?.city}
                    </li>
                ))}
            </ul>
        </div>
    );
}
