import React, { useEffect, useState } from 'react';
import { getRestaurants } from '../services/api';
import RestaurantBox from "./RestaurantBox";

export default function RestaurantList() {
    const [restaurants, setRestaurants] = useState([]);
    const [error, setError] = useState(null);

    const [search, setSearch] = useState('');
    const [city, setCity] = useState('');
    const [order, setOrder] = useState('');

    const fetchRestaurants = () => {
        const params = {};

        if (search)  params.name = search;
        if (city)    params.city = city;
        if (order)   params.sort = order;

        params.publicate = 'true';

        getRestaurants(params)
            .then(response => {
                setRestaurants(response.data.data || []);
            })
            .catch(err => {
                setError(err.message);
            });
    };

    useEffect(() => {
        fetchRestaurants();
    }, [search, city, order]);

    if (error) {
        return <p>Błąd: {error}</p>;
    }

    return (
        <div className="container py-3">
            <h2 className="font-semibold text-xl mb-3">Najnowsze</h2>
            <div className="p-9 bg-gray-300 grid grid-cols-1 xl:grid-cols-3 gap-4 rounded-2xl justify-center mb-4">
                <div className="mb-4 xl:mb-0">
                    <div className="relative w-fit">
                        <input
                            name="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-white rounded-2xl border border-black px-4 py-2 min-w-10 w-full xl:w-96 pe-9"
                            placeholder="Szukaj..."
                        />
                        <i className="fa-solid fa-magnifying-glass absolute top-1/2 end-3.5 transform -translate-y-1/2"></i>
                    </div>
                </div>

                <div className="flex items-center mb-4 xl:mb-0 xl:justify-center">
                    <label className="block text-gray-700 font-bold me-3" htmlFor="city">
                        Miasto:
                    </label>
                    <input
                        name="city"
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="bg-white rounded-2xl border border-black px-4 py-2"
                        placeholder="Np. Kraków"
                    />
                </div>

                <div className="flex items-center mb-4 xl:mb-0 xl:justify-end">
                    <label className="block text-gray-700 font-bold me-3" htmlFor="order">
                        Sortowanie:
                    </label>
                    <select
                        id="order"
                        className="bg-white rounded-2xl border border-black px-4 py-2"
                        name="order"
                        value={order}
                        onChange={(e) => setOrder(e.target.value)}
                    >
                        <option value="1">Od najnowszych</option>
                        <option value="2">Od najstarszych</option>
                        <option value="3">Od A do Z</option>
                        <option value="4">Od Z do A</option>
                        <option value="5">Od najlepszych</option>
                        <option value="6">Od najgorszych</option>
                    </select>
                </div>
            </div>

            <h2 className="font-semibold text-xl mb-3">Restauracje</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14 mb-8">
                {restaurants.map((restaurant) => (
                    <RestaurantBox key={restaurant.id} restaurant={restaurant} />
                ))}
            </div>
        </div>
    );
}
