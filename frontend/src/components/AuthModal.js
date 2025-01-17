import React, { useState } from 'react';
import { login, register } from '../services/api';

export default function AuthModal({ mode, close, switchMode }) {
    const [error, setError] = useState('');

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const isLogin = mode === 'login';
    const title = isLogin ? 'Logowanie' : 'Rejestracja';

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!isLogin) {
            if (!form.name || !form.email || !form.password) {
                setError('Wypełnij wszystkie pola.');
                return;
            }
            if (form.password !== form.confirmPassword) {
                setError('Hasła nie są takie same.');
                return;
            }
        } else {
            if (!form.email || !form.password) {
                setError('Wypełnij wszystkie pola.');
                return;
            }
        }

        try {
            if (isLogin) {
                const res = await login({
                    email: form.email,
                    password: form.password,
                });
                localStorage.setItem('token', res.data.token);
            } else {
                await register({
                    name: form.name,
                    email: form.email,
                    password: form.password,
                    password_confirmation: form.confirmPassword,
                });
            }
            close();
        } catch (err) {
            setError(err.response?.data?.message || 'Błąd operacji');
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={close}
        >
            <div
                className="bg-white rounded-2xl shadow-lg w-11/12 max-w-md p-5"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-4xl font-bold mb-4 text-center">{title}</h2>
                {error && <p className="text-red-500 font-semibold mb-3">{error}</p>}

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="mb-4">
                            <input
                                name="name"
                                type="text"
                                className="w-full border-black border rounded-2xl shadow-sm px-3 py-3"
                                placeholder="Nazwa"
                                value={form.name}
                                onChange={handleChange}
                            />
                        </div>
                    )}

                    <div className="mb-4">
                        <input
                            name="email"
                            type="email"
                            className="w-full border-black border rounded-2xl shadow-sm px-3 py-3"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <input
                            name="password"
                            type="password"
                            className="w-full border-black border rounded-2xl shadow-sm px-3 py-3"
                            placeholder="Hasło"
                            value={form.password}
                            onChange={handleChange}
                        />
                    </div>

                    {!isLogin && (
                        <div className="mb-4">
                            <input
                                name="confirmPassword"
                                type="password"
                                className="w-full border-black border rounded-2xl shadow-sm px-3 py-3"
                                placeholder="Powtórz hasło"
                                value={form.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                    )}

                    <div className="flex justify-between items-center flex-col">
                        <button
                            type="submit"
                            className="bg-brandRed text-white py-2 px-4 rounded-2xl w-full hover:bg-red-500"
                        >
                            {isLogin ? 'Zaloguj się' : 'Zarejestruj się'}
                        </button>
                        <button
                            type="button"
                            className="text-gray-500 mt-3 hover:text-gray-700"
                            onClick={close}
                        >
                            Zamknij
                        </button>
                    </div>
                </form>

                <div className="mt-4 text-center">
                    {isLogin ? (
                        <>
                            Nie masz konta?
                            <button
                                className="text-brandRed ml-1 font-bold hover:underline"
                                onClick={() => switchMode('register')}
                            >
                                Zarejestruj się
                            </button>
                        </>
                    ) : (
                        <>
                            Masz już konto?
                            <button
                                className="text-brandRed ml-1 font-bold hover:underline"
                                onClick={() => switchMode('login')}
                            >
                                Zaloguj się
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
