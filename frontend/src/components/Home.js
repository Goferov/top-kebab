import React, { useEffect, useState } from 'react';
import { getRestaurants } from '../services/api';
import RestaurantBox from '../components/RestaurantBox';


export default function Home() {
    const [restaurants, setRestaurants] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getRestaurants({limit: 3, publicate: 'true'})
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
                        {restaurants.map((restaurant) => (
                            <RestaurantBox key={restaurant.id} restaurant={restaurant} />
                        ))}
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
