import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    getRestaurant,
    saveRestaurant,
    updateRestaurant
} from '../services/api';

function AddRestaurantPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [messages, setMessages] = useState([]);
    const [success, setSuccess] = useState('');

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        website: '',
        description: '',
        file: null,
        image: '',
        delete_file: false,
        street: '',
        city: '',
        postalCode: '',
        houseNo: '',
        apartmentNo: '',
        addressId: ''
    });

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        getRestaurant(id)
            .then((res) => {
                setLoading(false);
                if (!res.data) {
                    setMessages(['Nie znaleziono restauracji.']);
                    return;
                }
                const r = res.data.data;
                setForm((prev) => ({
                    ...prev,
                    name: r.name || '',
                    email: r.email || '',
                    phone: r.phone || '',
                    website: r.website || '',
                    description: r.description || '',
                    image: r.image || '',
                    street: r.address?.street || '',
                    city: r.address?.city || '',
                    postalCode: r.address?.postal_code || '',
                    houseNo: r.address?.house_no || '',
                    apartmentNo: r.address?.apartment_no || '',
                    addressId: r.address?.id || ''
                }));
            })
            .catch((err) => {
                setLoading(false);
                setMessages([`Błąd: ${err.message}`]);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0] || null;
        setForm((prev) => ({ ...prev, file }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessages([]);
        setSuccess('');
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('name', form.name);
            formData.append('email', form.email);
            formData.append('phone', form.phone);
            formData.append('website', form.website);
            formData.append('description', form.description);

            if (form.file) {
                formData.append('file', form.file);
            }
            if (form.delete_file) {
                formData.append('delete_file', '1');
            }

            formData.append('street', form.street);
            formData.append('city', form.city);
            formData.append('postalCode', form.postalCode);
            formData.append('houseNo', form.houseNo);
            formData.append('apartmentNo', form.apartmentNo);
            if (form.addressId) {
                formData.append('addressId', form.addressId);
            }

            let response;
            if (!id) {
                response = await saveRestaurant(formData);
            } else {
                response = await updateRestaurant(id, formData);
            }

            setLoading(false);

            if (response.status >= 400) {
                setMessages(['Błąd zapisu restauracji.']);
                return;
            }

            setSuccess('Zapisano restaurację pomyślnie!');

        } catch (err) {
            setLoading(false);
            setMessages([`Błąd: ${err.message}`]);
        }
    };

    if (loading) {
        return <p className="p-4">Ładowanie...</p>;
    }

    return (
        <div className="container mx-auto mt-6">
            <h1 className="text-2xl font-bold mb-4">
                {!id ? 'Dodaj restaurację' : 'Edytuj restaurację'}
            </h1>

            {messages.map((msg, i) => (
                <p key={i} className="text-red-600 font-semibold mb-3">
                    {msg}
                </p>
            ))}

            {success && (
                <p className="text-green-600 font-semibold mb-3">
                    {success}
                </p>
            )}

            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="space-y-4 mb-5"
            >
                {/* Nazwa */}
                <div>
                    <input
                        className="border border-black py-2 px-3 w-full rounded-2xl"
                        placeholder="Nazwa*"
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                    />
                </div>

                {/* Email */}
                <div>
                    <input
                        className="border border-black py-2 px-3 w-full rounded-2xl"
                        placeholder="Email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                    />
                </div>

                {/* Telefon */}
                <div>
                    <input
                        className="border border-black py-2 px-3 w-full rounded-2xl"
                        placeholder="Telefon"
                        type="text"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                    />
                </div>

                {/* Website */}
                <div>
                    <input
                        className="border border-black py-2 px-3 w-full rounded-2xl"
                        placeholder="Strona internetowa"
                        type="url"
                        name="website"
                        value={form.website}
                        onChange={handleChange}
                    />
                </div>

                {/* Opis */}
                <div>
          <textarea
              className="border border-black py-2 px-3 w-full rounded-2xl"
              name="description"
              rows={5}
              placeholder="Opis"
              value={form.description}
              onChange={handleChange}
          />
                </div>

                {/* Plik */}
                <div>
                    <input
                        type="file"
                        className="border border-gray-300 p-2 text-sm"
                        name="file"
                        onChange={handleFileChange}
                    />
                    {id && form.image && (
                        <div className="mt-2">
                            <img
                                src={`/public/uploads/${form.image}`}
                                alt="Restaurant"
                                width="120"
                                height="120"
                                className="border border-gray-300 mb-1"
                            />
                            <label className="flex items-center gap-1 text-sm">
                                <input
                                    type="checkbox"
                                    name="delete_file"
                                    checked={form.delete_file}
                                    onChange={handleChange}
                                />
                                Usuń plik
                            </label>
                        </div>
                    )}
                </div>

                <hr className="my-4 border-gray-300" />

                <h2 className="text-xl font-semibold">Lokalizacja</h2>

                {/* Ulica */}
                <div>
                    <input
                        className="border border-black py-2 px-3 w-full rounded-2xl"
                        placeholder="Ulica*"
                        type="text"
                        name="street"
                        required
                        value={form.street}
                        onChange={handleChange}
                    />
                </div>

                {/* Miasto */}
                <div>
                    <input
                        className="border border-black py-2 px-3 w-full rounded-2xl"
                        placeholder="Miasto*"
                        type="text"
                        name="city"
                        required
                        value={form.city}
                        onChange={handleChange}
                    />
                </div>

                {/* Kod pocztowy */}
                <div>
                    <input
                        className="border border-black py-2 px-3 w-full rounded-2xl"
                        placeholder="Kod pocztowy*"
                        type="text"
                        name="postalCode"
                        required
                        value={form.postalCode}
                        onChange={handleChange}
                    />
                </div>

                {/* Numer budynku */}
                <div>
                    <input
                        className="border border-black py-2 px-3 w-full rounded-2xl"
                        placeholder="Numer budynku*"
                        type="text"
                        name="houseNo"
                        required
                        value={form.houseNo}
                        onChange={handleChange}
                    />
                </div>

                {/* Numer mieszkania */}
                <div>
                    <input
                        className="border border-black py-2 px-3 w-full rounded-2xl"
                        placeholder="Numer mieszkania"
                        type="text"
                        name="apartmentNo"
                        value={form.apartmentNo}
                        onChange={handleChange}
                    />
                </div>

                {/* AddressId */}
                {form.addressId && (
                    <input type="hidden" name="addressId" value={form.addressId} />
                )}

                {/* Submit */}
                <button
                    type="submit"
                    className="bg-brandRed rounded-2xl text-white w-full py-2 font-medium text-lg rounded hover:bg-red-700 transition-colors"
                >
                    {id ? 'Zapisz' : 'Dodaj'}
                </button>
            </form>
        </div>
    );
}

export default AddRestaurantPage;
