import React, { useEffect, useState } from 'react';
import PanelNav from '../components/PanelNav';
import { getRestaurants, deleteRestaurant, togglePublish } from '../services/api';

function AdminRestaurantList() {
    const [restaurants, setRestaurants] = useState([]);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        getRestaurants()
            .then((response) => {
                setRestaurants(response.data.data || response.data);
            })
            .catch((err) => {
                setError(err.message);
            });
    }, []);

    const handleAddRestaurant = () => {
        window.location.href = '/addRestaurant';
    };

    const handleEdit = (id) => {
        window.location.href = `/addRestaurant/${id}`;
    };

    const handlePublicate = async (id, currentPub) => {
        try {
            await togglePublish(id);
            setRestaurants((prev) =>
                prev.map((restaurant) =>
                    restaurant.id === id
                        ? { ...restaurant, publicate: !currentPub }
                        : restaurant
                )
            );
            setMessage(`The publication status has been changed for the restaurant ID: ${id}`);
            setSuccess(true);
        } catch (err) {
            setMessage(err.response?.data?.message || 'An error occurred while changing the publication status.');
            setSuccess(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this restaurant?')) {
            return;
        }

        try {
            await deleteRestaurant(id);
            setRestaurants((prev) => prev.filter((restaurant) => restaurant.id !== id));
            setMessage(`Restaurant ID: ${id} has been deleted.`);
            setSuccess(true);
        } catch (err) {
            setMessage(err.response?.data?.message || 'An error occurred while removing a restaurant.');
            setSuccess(false);
        }
    };

    if (error) return <p>Error: {error}</p>;

    return (
        <section className="admin-panel container mx-auto mt-6">
            <h1 className="text-2xl font-bold mb-4">Your account</h1>

            <div className="user-panel flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4">
                    <PanelNav isAdmin={true} />
                </div>

                <div className="content md:w-3/4 pb-6">
                    <div className="flex flex-col items-center justify-center mb-4">
                        {message && (
                            <p className={success ? 'text-green-600' : 'text-red-600'}>
                                {message}
                            </p>
                        )}
                    </div>
                    <div className="flex items-center justify-end mb-3">
                        <button
                            onClick={handleAddRestaurant}
                            className="bg-red-600 text-white px-4 py-2 rounded font-medium hover:bg-red-700 transition-colors"
                            title="Add restaurant"
                        >
                            Add restaurant
                        </button>
                    </div>

                    <table className="min-w-full border border-gray-300 text-left text-sm">
                        <thead className="bg-gray-100 border-b border-gray-300">
                        <tr>
                            <th className="py-2 px-3 w-16">No.</th>
                            <th className="py-2 px-3">Image</th>
                            <th className="py-2 px-3">Name</th>
                            <th className="py-2 px-3 w-32 text-center">Options</th>
                        </tr>
                        </thead>
                        <tbody>
                        {restaurants.map((restaurant, index) => (
                            <tr
                                key={restaurant.id}
                                id={`row_${restaurant.id}`}
                                className="border-b last:border-0 hover:bg-gray-50"
                            >
                                <td className="py-2 px-3">{index + 1}</td>
                                <td className="py-2 px-3">
                                    <img
                                        src={
                                            restaurant.image
                                                ? `${process.env.REACT_APP_STORAGE_URL}/uploads/${restaurant.image}`
                                                : '/placeholder.png'
                                        }
                                        alt={restaurant.name}
                                        className="w-16 h-16 object-cover border border-gray-200"
                                    />
                                </td>
                                <td className="py-2 px-3">{restaurant.name}</td>
                                <td className="py-2 px-3">
                                    <div className="flex justify-center items-center gap-3">
                                        <button
                                            onClick={() => handleEdit(restaurant.id)}
                                            title="Edytuj"
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <i className="fa-solid fa-edit"></i>
                                        </button>
                                        <button
                                            onClick={() =>
                                                handlePublicate(restaurant.id, restaurant.publicate)
                                            }
                                            className={`${
                                                restaurant.publicate
                                                    ? 'text-green-600'
                                                    : 'text-red-600'
                                            } hover:text-green-800`}
                                            title="Publicate toggle"
                                        >
                                            <i className="fa-solid fa-eye"></i>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(restaurant.id)}
                                            className="text-red-600 hover:text-red-800"
                                            title="Usuń"
                                        >
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {restaurants.length === 0 && (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="py-4 px-3 text-center text-gray-500"
                                >
                                    No restaurants to display.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

export default AdminRestaurantList;
