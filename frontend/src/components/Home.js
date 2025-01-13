import React, { useEffect, useState } from 'react';
import { getRestaurants } from '../services/api';

export default function Home() {
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
        <main>
            <section>
                <div className="container py-5">
                    <div className="banner-img rounded-2xl" style={{
                        backgroundImage: `url('/banner.jpg')`,
                    }}>
                        <div className="banner-overlayer text-white p-9">
                            <h1 className="font-bold uppercase text-2xl md:text-5xl mb-6 md:mb-8 leading-5 md:leading-10 text-center md:text-start">
                                <span className="block mb-3 md:mb-5">Twoje zdanie</span>
                                <span className="block">liczy się tutaj!</span>
                            </h1>
                            <a
                                href="/restaurant"
                                className="border-2 border-white rounded-2xl py-2 px-7 text-xl md:text-xl font-semibold hover:bg-brandRed hover:border-brandRed block w-fit mx-auto md:inline-block"
                                title="Restauracje"
                            >
                                Restauracje
                            </a>
                        </div>

                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <h2 className="font-semibold text-xl mb-3">Najnowsze</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14 mb-8">
                        <div className="">
                            <a href="#" className="block shadow-lg overflow-hidden rounded-2xl border-1 border-gray-400 hover:text-inherit">
                                <div className="h-52">
                                    <img src="/placeholder.png" className="h-full object-cover w-full transition-transform hover:scale-110" alt=""/>
                                </div>
                                <div className="px-4 py-2.5">
                                    <h3 className="text-xl font-semibold ">Efes kebab</h3>
                                    <div className="text-xs flex items-center my-2 gap-3">
                                        <div className="rounded-2xl bg-gray-300 px-2 py-0.5"><i className="fa-solid fa-location-dot mr-1"></i> test</div>
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
                        <div className="">
                            <a href="#" className="block shadow-lg overflow-hidden rounded-2xl border-1 border-gray-400 hover:text-inherit ">
                                <div className="h-52">
                                    <img src="/placeholder.png" className="h-full object-cover w-full transition-transform hover:scale-110" alt=""/>
                                </div>
                                <div className="px-4 py-2.5">
                                    <h3 className="text-xl font-semibold ">Efes kebab</h3>
                                    <div className="text-xs flex items-center my-2 gap-3">
                                        <div className="rounded-2xl bg-gray-300 px-2 py-0.5"><i className="fa-solid fa-location-dot mr-1"></i> test</div>
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
                        <div className="">
                            <a href="#" className="block shadow-lg overflow-hidden rounded-2xl border-1 border-gray-400 hover:text-inherit">
                                <div className="h-52">
                                    <img src="/placeholder.png" className="h-full object-cover w-full transition-transform hover:scale-110" alt=""/>
                                </div>
                                <div className="px-4 py-2.5">
                                    <h3 className="text-xl font-semibold ">Efes kebab</h3>
                                    <div className="text-xs flex items-center my-2 gap-3">
                                        <div className="rounded-2xl bg-gray-300 px-2 py-0.5"><i className="fa-solid fa-location-dot mr-1"></i> test</div>
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
                    </div>
                    {/*<ul>*/}
                    {/*    {restaurants.map((restaurant) => (*/}
                    {/*        <li key={restaurant.id}>*/}
                    {/*            {restaurant.name} - {restaurant.address?.city}*/}
                    {/*        </li>*/}
                    {/*    ))}*/}
                    {/*</ul>*/}
                </div>
            </section>
        </main>

    );
}
