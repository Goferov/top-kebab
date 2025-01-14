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
        <div className="container py-3">
            <h2 className="font-semibold text-xl mb-3">Najnowsze</h2>
            <div className="p-9 bg-gray-300 grid grid-cols-1 xl:grid-cols-3 gap-4 rounded-2xl justify-center mb-4">
                <div className=" mb-4 xl:mb-0">
                    <div className="relative w-fit">
                        <input
                            name="search"
                            className="bg-white rounded-2xl border border-black px-4 py-2 min-w-10 w-full xl:w-96 pe-9"
                            placeholder="Szukaj..."
                        />
                        <i className="fa-solid fa-magnifying-glass absolute top-1/2 end-3.5 transform -translate-y-1/2"></i>
                    </div>
                </div>
                <div className="flex items-center mb-4 xl:mb-0 xl:justify-center">
                    <label className="block text-gray-700 font-bold me-3" htmlFor="search">
                        Miasto:
                    </label>
                    <input
                        name="search"
                        id="search"
                        className="bg-white rounded-2xl border border-black px-4 py-2"
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
                    <div className="">
                        <a href="/restaurant/1" className="block shadow-lg overflow-hidden rounded-2xl border-1 border-gray-400 hover:text-inherit ">
                        <div className="h-52">
                        <img src="/placeholder.png" className="h-full object-cover w-full transition-transform hover:scale-110" alt=""/>
                        </div>
                            <div className="px-4 py-2.5">
                            <h3 className="text-xl font-semibold ">{restaurant.name}</h3>
                            <div className="text-xs flex items-center my-2 gap-3">
                                <div className="rounded-2xl bg-gray-300 px-2 py-0.5"><i className="fa-solid fa-location-dot mr-1"></i> {restaurant.address?.city}</div>
                                <div className="rounded-2xl bg-gray-300 px-2 py-0.5"><i className="fa-solid fa-globe mr-1"></i> test123</div>
                            </div>
                            <div className="flex items-center mt-3 mb-2">
                            <div className="flex items-center gap-1">
                                <i className="fa-solid fa-star text-yellow-300"></i>
                                <i className="fa-solid fa-star text-yellow-300"></i>
                                <i className="fa-solid fa-star text-yellow-300"></i>
                                <i className="fa-solid fa-star text-yellow-300"></i>
                                <i className="fa-solid fa-star text-yellow-300"></i>
                            </div>
                            <div className=" text-sm font-semibold ms-2 mt-0.5">
                            4.8/5.0
                            </div>
                            </div>
                            </div>
                        </a>
                    </div>

                ))}
            </div>
        </div>
    );
}
