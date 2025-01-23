import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    getRestaurant,
    saveRestaurant,
    updateRestaurant
} from '../services/api';
import Loader from "../components/Loader";

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
                    setMessages(['No restaurant found.']);
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
                setMessages([`Error: ${err.message}`]);
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
        const file = e.target.files?.[0];
        if (!file) return;

        const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
        const maxFileSize = 2 * 1024 * 1024; // 2 MB

        if (!validTypes.includes(file.type)) {
            setMessages(['The file must be an image in JPG, PNG or GIF format.']);
            return;
        }

        if (file.size > maxFileSize) {
            setMessages(['The file is too large. The maximum size is 2 MB.']);
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setForm((prev) => ({
                ...prev,
                file: reader.result.split(',')[1],
            }));
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessages([]);
        setSuccess('');
        setLoading(true);

        try {
            const jsonData = {
                name: form.name,
                email: form.email || '',
                phone: form.phone || '',
                website: form.website || '',
                description: form.description || '',
                image: form.file || null,
                delete_file: form.delete_file || false,
                address: {
                    street: form.street,
                    city: form.city,
                    postal_code: form.postalCode,
                    house_no: form.houseNo,
                    apartment_no: form.apartmentNo || null,
                },
            };

            let response;
            if (!id) {
                response = await saveRestaurant(jsonData);
                const newId = response.data.data.id;
                setSuccess('New restaurant added!');
                navigate(`/addRestaurant/${newId}`);
            } else {
                response = await updateRestaurant(id, jsonData);
                setSuccess('Changes in the restaurant have been saved!');
            }

            setForm({
                ...form,
                image: response.data.data.image,
            });

            setLoading(false);
        } catch (err) {
            setLoading(false);
            setMessages([`Błąd: ${err.response?.data?.message || err.message}`]);
        }
    };




    if (loading) {
        return <Loader />;
    }

    return (
        <div className="container mx-auto mt-6">
            <h1 className="text-2xl font-bold mb-4">
                {!id ? 'Add a restaurant' : 'Edit the restaurant'}
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
                <div>
                    <input
                        className="border border-black py-2 px-3 w-full rounded-2xl"
                        placeholder="Name*"
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                    />
                </div>

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

                <div>
                    <input
                        className="border border-black py-2 px-3 w-full rounded-2xl"
                        placeholder="Phone"
                        type="text"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <input
                        className="border border-black py-2 px-3 w-full rounded-2xl"
                        placeholder="Website"
                        type="url"
                        name="website"
                        value={form.website}
                        onChange={handleChange}
                    />
                </div>

                <div>
          <textarea
              className="border border-black py-2 px-3 w-full rounded-2xl"
              name="description"
              rows={5}
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
          />
                </div>

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
                                src={`${process.env.REACT_APP_STORAGE_URL}/uploads/${form.image}`}
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
                                Delete image
                            </label>
                        </div>
                    )}
                </div>

                <hr className="my-4 border-gray-300" />

                <h2 className="text-xl font-semibold">Location</h2>

                <div>
                    <input
                        className="border border-black py-2 px-3 w-full rounded-2xl"
                        placeholder="Street*"
                        type="text"
                        name="street"
                        required
                        value={form.street}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <input
                        className="border border-black py-2 px-3 w-full rounded-2xl"
                        placeholder="City*"
                        type="text"
                        name="city"
                        required
                        value={form.city}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <input
                        className="border border-black py-2 px-3 w-full rounded-2xl"
                        placeholder="Postal Code*"
                        type="text"
                        name="postalCode"
                        required
                        value={form.postalCode}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <input
                        className="border border-black py-2 px-3 w-full rounded-2xl"
                        placeholder="House no*"
                        type="text"
                        name="houseNo"
                        required
                        value={form.houseNo}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <input
                        className="border border-black py-2 px-3 w-full rounded-2xl"
                        placeholder="Apartment no"
                        type="text"
                        name="apartmentNo"
                        value={form.apartmentNo}
                        onChange={handleChange}
                    />
                </div>

                {form.addressId && (
                    <input type="hidden" name="addressId" value={form.addressId} />
                )}

                <button
                    type="submit"
                    className="bg-brandRed rounded-2xl text-white w-full py-2 font-medium text-lg rounded hover:bg-red-700 transition-colors"
                >
                    {id ? 'Save' : 'Add'}
                </button>
            </form>
        </div>
    );
}

export default AddRestaurantPage;
