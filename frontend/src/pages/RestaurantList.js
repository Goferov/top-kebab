import React, { useEffect, useState } from 'react';
import { getRestaurants } from '../services/api';
import RestaurantBox from '../components/RestaurantBox';
import Placeholder from "../components/Placeholder";

export default function RestaurantList() {
    const [restaurants, setRestaurants] = useState([]);
    const [error, setError] = useState(null);

    const [search, setSearch] = useState('');
    const [city, setCity] = useState('');
    const [order, setOrder] = useState('');

    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [debouncedCity, setDebouncedCity] = useState('');

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(search), 300);
        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedCity(city), 300);
        return () => clearTimeout(timer);
    }, [city]);

    const fetchRestaurants = () => {
        setLoading(true);
        const params = {};

        if (debouncedSearch) params.name = debouncedSearch;
        if (debouncedCity) params.city = debouncedCity;
        if (order) params.sort = order;

        params.publicate = 'true';

        getRestaurants(params)
            .then((response) => {
                setRestaurants(response.data.data || []);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchRestaurants();
    }, [debouncedSearch, debouncedCity, order]);

    if (error) {
        return <p>Błąd: {error}</p>;
    }

    return (
        <div className="container py-3">
            <h2 className="font-semibold text-xl mb-3">Latest</h2>
            <div className="p-9 bg-gray-300 grid grid-cols-1 xl:grid-cols-3 gap-4 rounded-2xl justify-center mb-4">
                <div className="mb-4 xl:mb-0">
                    <div className="relative w-fit">
                        <input
                            name="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-white rounded-2xl border border-black px-4 py-2 min-w-10 w-full xl:w-96 pe-9"
                            placeholder="Search..."
                        />
                        <i className="fa-solid fa-magnifying-glass absolute top-1/2 end-3.5 transform -translate-y-1/2"></i>
                    </div>
                </div>

                <div className="flex items-center mb-4 xl:mb-0 xl:justify-center">
                    <label className="block text-gray-700 font-bold me-3" htmlFor="city">
                        City:
                    </label>
                    <input
                        name="city"
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="bg-white rounded-2xl border border-black px-4 py-2"
                        placeholder="E.g. Krakow"
                    />
                </div>

                <div className="flex items-center mb-4 xl:mb-0 xl:justify-end">
                    <label className="block text-gray-700 font-bold me-3" htmlFor="order">
                        Sorting:
                    </label>
                    <select
                        id="order"
                        className="bg-white rounded-2xl border border-black px-4 py-2"
                        name="order"
                        value={order}
                        onChange={(e) => setOrder(e.target.value)}
                    >
                        <option value="1">Latest</option>
                        <option value="2">Oldest</option>
                        <option value="3">A - Z</option>
                        <option value="4">Z - A</option>
                        <option value="5">Best</option>
                        <option value="6">Worst</option>
                    </select>
                </div>
            </div>

            <h2 className="font-semibold text-xl mb-3">Restaurants</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14 mb-8">
                {loading
                    ? Array(6)
                        .fill(null)
                        .map((_, index) => <Placeholder key={index} />)
                    : restaurants.map((restaurant) => (
                        <RestaurantBox key={restaurant.id} restaurant={restaurant} />
                    ))}
            </div>
        </div>
    );
}
