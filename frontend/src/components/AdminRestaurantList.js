import React, {useEffect, useState} from 'react';
import PanelNav from './PanelNav';
import { getRestaurants } from '../services/api';

function AdminRestaurantList() {
    // Przykładowe metody obsługi przycisków:
    const handleAddRestaurant = () => {
        window.location.href = '/addRestaurant';
    };

    const handleEdit = (id) => {
        window.location.href = `/addRestaurant/${id}`;
    };

    const handlePublicate = (id, currentPub) => {
        // Wywołanie zapytania do API, przełączenie publicate
        console.log('Publicate toggled for ID:', id, 'Obecnie:', currentPub);
        // Po sukcesie: odśwież listę lub zaktualizuj stan
    };

    const handleDelete = (id) => {
        // Wywołanie API do usunięcia
        console.log('Delete clicked for ID:', id);
        // Po sukcesie: odśwież listę / usuń w stanie
    };

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
        <section className="admin-panel container mx-auto mt-6">
            <h1 className="text-2xl font-bold mb-4">Twoje konto</h1>

            <div className="user-panel flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4">
                    <PanelNav isAdmin={true} />
                </div>

                <div className="content md:w-3/4 pb-6">
                    <div className="flex items-center justify-end mb-3">
                        <button
                            onClick={handleAddRestaurant}
                            className="bg-red-600 text-white px-4 py-2 rounded font-medium hover:bg-red-700 transition-colors"
                            title="Dodaj restaurację"
                        >
                            Dodaj restaurację
                        </button>
                    </div>

                    <table className="min-w-full border border-gray-300 text-left text-sm">
                        <thead className="bg-gray-100 border-b border-gray-300">
                        <tr>
                            <th className="py-2 px-3 w-16">L.p.</th>
                            <th className="py-2 px-3">Zdjęcie</th>
                            <th className="py-2 px-3">Nazwa</th>
                            <th className="py-2 px-3 w-32 text-center">Opcje</th>
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
                                                ? `/public/uploads/${restaurant.image}`
                                                : '/public/img/placeholder.png'
                                        }
                                        alt={restaurant.name}
                                        className="w-16 h-16 object-cover border border-gray-200"
                                    />
                                </td>
                                <td className="py-2 px-3">
                                    {restaurant.name}
                                </td>
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
                                                restaurant.publicate ? 'text-green-600' : 'text-gray-400'
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
                                    Brak restauracji do wyświetlenia.
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
