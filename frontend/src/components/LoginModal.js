import React, { useState } from 'react';
import { useModal } from '../services/modal';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function LoginModal() {
    const { closeModal } = useModal();
    const navigate = useNavigate();
    const [loginForm, setLoginForm] = useState({ email: '', password: '' });
    const [loginError, setLoginError] = useState('');

    const handleLoginChange = (e) => {
        setLoginForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoginError('');

        if (!loginForm.email || !loginForm.password) {
            setLoginError('Fill in all fields.');
            return;
        }

        try {
            const response = await login({
                email: loginForm.email,
                password: loginForm.password,
            });
            localStorage.setItem('token', response.data.token);
            closeModal();
            setLoginForm({ email: '', password: '' });
            navigate('/panel');
        } catch (err) {
            setLoginError(err.response?.data?.message || 'Incorrect login data');
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={closeModal}
        >
            <div
                className="bg-white rounded-2xl shadow-lg w-11/12 max-w-md p-5"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-4xl font-bold mb-4 text-center">Logging</h2>
                {loginError && (
                    <p className="text-red-500 font-semibold mb-3">{loginError}</p>
                )}
                <form onSubmit={handleLoginSubmit}>
                    <div className="mb-4">
                        <input
                            name="email"
                            type="email"
                            className="w-full border-black border rounded-2xl shadow-sm px-3 py-3"
                            placeholder="Email"
                            value={loginForm.email}
                            onChange={handleLoginChange}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            name="password"
                            type="password"
                            className="w-full border-black border rounded-2xl shadow-sm px-3 py-3"
                            placeholder="Password"
                            value={loginForm.password}
                            onChange={handleLoginChange}
                        />
                    </div>
                    <div className="flex justify-between items-center flex-col">
                        <button
                            type="submit"
                            className="bg-brandRed text-white py-2 px-4 rounded-2xl w-full hover:bg-red-500"
                        >
                            Log in
                        </button>
                        <button
                            type="button"
                            className="text-gray-500 mt-3 hover:text-gray-700"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
