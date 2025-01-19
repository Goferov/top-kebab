import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRestaurant, storeReview } from '../services/api';
import StarRating from '../components/StarRating';

function RestaurantDetails() {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [error, setError] = useState(null);

    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        getRestaurant(id)
            .then((res) => {
                setRestaurant(res.data.data);
            })
            .catch((err) => setError(err.message));
    }, [id]);

    if (error) {
        return <p className="text-red-500">Błąd: {error}</p>;
    }

    if (!restaurant) {
        return <p>Ładowanie...</p>;
    }

    const handleReviewSubmit = async (e) => {
        e.preventDefault();

        const rateValue = parseInt(e.target.rate.value, 10);
        const reviewText = e.target.review.value.trim();

        if (isNaN(rateValue) || rateValue < 1 || rateValue > 5) {
            setMessage('Ocena musi być liczbą od 1 do 5.');
            setSuccess(false);
            return;
        }

        if (reviewText.length === 0 || reviewText.length > 250) {
            setMessage('Treść opinii jest wymagana i nie może przekraczać 250 znaków.');
            setSuccess(false);
            return;
        }

        try {
            const response = await storeReview(restaurant.id, {
                rate: rateValue,
                review: reviewText,
            });

            const newReview = response.data.data;

            setMessage('Opinia została dodana pomyślnie!');
            setSuccess(true);

            const totalReviews = restaurant.reviews.length + 1;
            const totalRating = restaurant.reviews.reduce((sum, r) => sum + r.rate, 0) + rateValue;
            const newAverageRate = (totalRating / totalReviews).toFixed(2);

            setRestaurant((prev) => ({
                ...prev,
                average_rate: newAverageRate,
                reviews: [...prev.reviews, newReview],
            }));

            e.target.reset();
        } catch (err) {
            if (err.response?.status === 401) {
                setMessage('Musisz być zalogowany, aby dodać opinię.');
            } else {
                setMessage(err.response?.data?.message || 'Wystąpił błąd podczas dodawania opinii.');
            }
            setSuccess(false);
        }
    };



    return (
        <div className="container my-7">
            <section className="my-3">
                <div className="flex flex-col md:flex-row gap-10">

                    <div className="md:w-1/3">
                        <img
                            src={restaurant.image ? `${restaurant.image}` : '/placeholder.png'}
                            className="w-full h-64 object-cover border border-gray-200 md:block hidden"
                            alt={restaurant.name}
                        />
                    </div>

                    <div className="md:w-2/3">
                        <h1 className="font-bold text-4xl mb-2">{restaurant.name}</h1>

                        <div className="flex items-center mb-2">
                            <StarRating rating={restaurant.average_rate} />
                            <div className="text-lg font-semibold ml-2 mt-0.5">
                                {restaurant.average_rate}/5.0
                            </div>
                        </div>

                        <hr className="h-px my-4 border-0 bg-gray-300" />

                        <div className="md:w-1/3 mb-6">
                            <img
                                src={restaurant.image ? `${restaurant.image}` : '/placeholder.png'}
                                className="w-full h-64 object-cover border border-gray-200 md:hidden block"
                                alt={restaurant.name}
                            />
                        </div>
                        <div className="info mb-2">
                            {restaurant.phone && (
                                <p className="mb-1">
                                    <i className="fa-solid fa-phone-flip"></i>{' '}
                                    <a href={`tel:${restaurant.phone}`}>{restaurant.phone}</a>
                                </p>
                            )}

                            {restaurant.email && (
                                <p className="mb-1">
                                    <i className="fa-solid fa-envelope"></i>{' '}
                                    <a href={`mailto:${restaurant.email}`}>{restaurant.email}</a>
                                </p>
                            )}

                            {restaurant.address && (
                                <p className="mb-1">
                                    <i className="fa-solid fa-location-dot"></i>{' '}
                                    {restaurant.address.street}{' '}
                                    {restaurant.address.house_no && (
                                        <span>{restaurant.address.house_no}</span>
                                    )}
                                    {restaurant.address.apartment_no && (
                                        <span>, apt. {restaurant.address.apartment_no}</span>
                                    )}
                                    {', '}
                                    {restaurant.address.postal_code}{' '}
                                    {restaurant.address.city}
                                </p>
                            )}

                            {restaurant.website && (
                                <p className="mb-1">
                                    <i className="fa-solid fa-globe"></i>{' '}
                                    <a
                                        href={restaurant.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {restaurant.website}
                                    </a>
                                </p>
                            )}
                        </div>

                        <p className="font-medium my-6">{restaurant.description}</p>
                    </div>
                </div>
            </section>

            <section className="my-6">
                <h2 className="font-semibold text-xl mb-3">Opinie użytkowników</h2>

                <div className="flex flex-col-reverse md:flex-row gap-10">
                    <div className="md:w-2/3 space-y-3 mb-6">
                        {restaurant.reviews && restaurant.reviews.length > 0 ? (
                            restaurant.reviews.map((review) => (
                                <div
                                    key={review.id}
                                    className="border border-gray-300 p-3 rounded-3xl"
                                >
                                    <div className="flex items-center mb-1 font-medium">
                                        {review.user_name ?? 'Anonim'}
                                        <span className="mx-2 text-gray-400">|</span>
                                        <div className="font-bold">{review.rate}/5</div>
                                    </div>
                                    <div className="whitespace-pre-wrap">
                                        {review.review}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">Brak opinii do wyświetlenia.</p>
                        )}
                    </div>

                    <div className="md:w-1/3 ">
                        <form
                            className="p-4 border border-gray-300 rounded-3xl"
                            onSubmit={handleReviewSubmit}
                            method="post"
                        >
                            {message && (
                                <p className={success ? 'text-green-600' : 'text-red-600'}>
                                    {message}
                                </p>
                            )}

                            <h3 className="font-semibold text-lg mb-3">Dodaj opinię</h3>

                            <div>
                                <input
                                    className="border border-black px-4 py-2 w-full rounded-2xl mb-4"
                                    type="number"
                                    name="rate"
                                    min="1"
                                    max="5"
                                    step="1"
                                    placeholder="Ocena (od 1 do 5)"
                                    required
                                    title="Ocena musi być liczbą od 1 do 5."
                                />
                            </div>

                            <div>
                            <textarea
                                className="border border-black px-4 py-2 w-full rounded-2xl mb-4"
                                name="review"
                                rows="4"
                                maxLength={250}
                                placeholder="Treść (max 250 znaków)*"
                                required
                                title="Treść opinii jest wymagana i nie może przekraczać 250 znaków."
                            />
                            </div>

                            <button
                                type="submit"
                                className="bg-brandRed text-white px-4 py-2 rounded-2xl font-medium hover:bg-red-700 transition-colors"
                            >
                                Dodaj opinie
                            </button>
                        </form>

                    </div>
                </div>
            </section>

        </div>
    );
}

export default RestaurantDetails;
