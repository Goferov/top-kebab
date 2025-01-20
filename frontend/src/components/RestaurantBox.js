import React from 'react';
import StarRating from '../components/StarRating';


export default function RestaurantBox({ restaurant }) {
    return (
        <div className="">
            <a
                href={`/restaurant/${restaurant.id}`}
                className="block shadow-lg overflow-hidden rounded-2xl border border-gray-400 hover:text-inherit"
            >
                <div className="h-52 overflow-hidden">
                    <img
                        src={restaurant.image ? `${process.env.REACT_APP_STORAGE_URL}/uploads/${restaurant.image}` : '/placeholder.png'}
                        className="h-full object-cover w-full transition-transform hover:scale-110"
                        alt={restaurant.name}
                    />
                </div>
                <div className="px-4 py-2.5">
                    <h3 className="text-xl font-semibold ">{restaurant.name}</h3>
                    <div className="text-xs flex items-center my-2 gap-3">
                        {restaurant.address?.city && (
                            <div className="rounded-2xl bg-gray-300 px-2 py-0.5">
                                <i className="fa-solid fa-location-dot mr-1"></i> {restaurant.address.city}
                            </div>
                        )}
                        {restaurant.website && (
                            <div className="rounded-2xl bg-gray-300 px-2 py-0.5">
                                <i className="fa-solid fa-globe mr-1"></i> {restaurant.website}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center mt-3 mb-2">
                        <StarRating rating={restaurant.average_rate} />
                        <div className="text-sm font-semibold ml-2 mt-0.5">
                            {restaurant.average_rate ?? '0'}/5.0
                        </div>
                    </div>
                </div>
            </a>
        </div>
    );
}
