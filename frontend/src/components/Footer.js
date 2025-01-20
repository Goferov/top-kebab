import React, { useState } from 'react';
import { useModal } from '../services/modal';
import { login, register } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const { modalType, openModal, closeModal } = useModal();
    const [loginForm, setLoginForm] = useState({ email: '', password: '' });
    const [loginError, setLoginError] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
    const [registerForm, setRegisterForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [registerError, setRegisterError] = useState('');

    const handleLoginChange = (e) => {
        setLoginForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoginError('');

        if (!loginForm.email || !loginForm.password) {
            setLoginError('Wypełnij wszystkie pola.');
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
            setLoginError(err.response?.data?.message || 'Nieprawidłowe dane logowania');
        }
    };

    const handleRegisterChange = (e) => {
        setRegisterForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setRegisterError('');

        if (!registerForm.name || !registerForm.email || !registerForm.password) {
            setRegisterError('Wypełnij wszystkie pola.');
            return;
        }
        if (registerForm.password !== registerForm.confirmPassword) {
            setRegisterError('Hasła nie są takie same.');
            return;
        }

        try {
            await register({
                name: registerForm.name,
                email: registerForm.email,
                password: registerForm.password,
                password_confirmation: registerForm.confirmPassword,
            });
            closeModal();
            setRegisterForm({ name: '', email: '', password: '', confirmPassword: '' });
            setLoginMessage('Zostałeś pomyślnie zarejestrowany. Możesz się zalogować.');
            openModal('login');
        } catch (err) {
            setRegisterError(err.response?.data?.message || 'Błąd rejestracji');
        }
    };

    return (
        <>
            <footer className="text-white">
                <div className="bg-brandRed py-5">
                    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                            <a href="/" title="Home" className="mb-5 block">
                                <img src="/logo-white.svg" alt="TopKebab logo" />
                            </a>
                            <p className="max-w-72">
                                TopKebab to nie tylko portal, to miejsce spotkań dla smakoszy kebaba. TopKebab to zespół pasjonatów, którzy dbają o to, aby każdy kebab, który znajduje się na naszej stronie, był godny uwagi.
                            </p>
                        </div>
                        <div>
                            <h6 className="uppercase mb-3 font-bold">Kontakt</h6>
                            <ul className="list-none relative ps-4">
                                <div className="absolute left-0 bottom-0 top-0 h-100 w-1 bg-brandRedLight"></div>
                                <li>
                                    <a href="tel:+48514343443" className="hover:text-red-400 flex items-center">
                                        <i className="fa-solid fa-phone-flip me-2"></i> +48 514 343 443
                                    </a>
                                </li>
                                <li>
                                    <a href="mailto:redakcja@topkebab.pl" className="hover:text-red-400 flex items-center">
                                        <i className="fa-solid fa-envelope me-2"></i> redakcja@topkebab.pl
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h6 className="uppercase mb-3 font-bold">Menu</h6>
                            <ul className="list-none relative ps-4">
                                <div className="absolute left-0 bottom-0 top-0 h-100 w-1 bg-brandRedLight"></div>
                                <li className="hover:text-red-400">
                                    <a href="/">Home</a>
                                </li>
                                <li className="hover:text-red-400">
                                    <a href="/restaurant">Restauracje</a>
                                </li>
                                <li className="hover:text-red-400">
                                    <a href="/contact">Kontakt</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="bg-brandBlack">
                    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 py-1 text-xs text-center md:text-start">
                        <div>TOPKEBAB &copy; {new Date().getFullYear()} Wszelkie prawa zastrzeżone.</div>
                        <div className="hidden md:block"></div>
                        <div className="md:text-end">Realizacja: Marcin Godfryd</div>
                    </div>
                </div>
            </footer>



            {!token && (
                <>
                    {modalType === 'login' && (
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                            onClick={closeModal}
                        >
                            <div
                                className="bg-white rounded-2xl shadow-lg w-11/12 max-w-md p-5"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <h2 className="text-4xl font-bold mb-4 text-center">Logowanie</h2>
                                {loginError && (
                                    <p className="text-red-500 font-semibold mb-3">
                                        {loginError}
                                    </p>
                                )}
                                {loginMessage && (
                                    <p className="text-green-500 font-semibold mb-3">
                                        {loginMessage}
                                    </p>
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
                                            placeholder="Hasło"
                                            value={loginForm.password}
                                            onChange={handleLoginChange}
                                        />
                                    </div>
                                    <div className="flex justify-between items-center flex-col">
                                        <button
                                            type="submit"
                                            className="bg-brandRed text-white py-2 px-4 rounded-2xl w-full hover:bg-red-500"
                                        >
                                            Zaloguj się
                                        </button>
                                        <button
                                            type="button"
                                            className="text-gray-500 mt-3 hover:text-gray-700"
                                            onClick={closeModal}
                                        >
                                            Zamknij
                                        </button>
                                    </div>
                                </form>
                                <div className="mt-4 text-center">
                                    Nie masz konta?
                                    <button
                                        className="text-brandRed ml-1 font-bold hover:underline"
                                        onClick={() => openModal('register')}
                                    >
                                        Zarejestruj się
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {modalType === 'register' && (
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                            onClick={closeModal}
                        >
                            <div
                                className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-5"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <h2 className="text-4xl font-bold mb-4 text-center">
                                    Rejestracja
                                </h2>
                                {registerError && (
                                    <p className="text-red-500 font-semibold mb-3">
                                        {registerError}
                                    </p>
                                )}
                                <form onSubmit={handleRegisterSubmit}>
                                    <div className="mb-4">
                                        <input
                                            name="name"
                                            type="text"
                                            className="w-full border-black border rounded-2xl shadow-sm px-3 py-3"
                                            placeholder="Nazwa"
                                            value={registerForm.name}
                                            onChange={handleRegisterChange}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <input
                                            name="email"
                                            type="email"
                                            className="w-full border-black border rounded-2xl shadow-sm px-3 py-3"
                                            placeholder="Email"
                                            value={registerForm.email}
                                            onChange={handleRegisterChange}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <input
                                            name="password"
                                            type="password"
                                            className="w-full border-black border rounded-2xl shadow-sm px-3 py-3"
                                            placeholder="Hasło"
                                            value={registerForm.password}
                                            onChange={handleRegisterChange}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <input
                                            name="confirmPassword"
                                            type="password"
                                            className="w-full border-black border rounded-2xl shadow-sm px-3 py-3"
                                            placeholder="Powtórz hasło"
                                            value={registerForm.confirmPassword}
                                            onChange={handleRegisterChange}
                                        />
                                    </div>
                                    <div className="flex justify-between items-center flex-col">
                                        <button
                                            type="submit"
                                            className="bg-brandRed text-white py-2 px-4 rounded-2xl w-full hover:bg-red-500"
                                        >
                                            Zarejestruj się
                                        </button>
                                        <button
                                            type="button"
                                            className="text-gray-500 mt-3 hover:text-gray-700"
                                            onClick={closeModal}
                                        >
                                            Zamknij
                                        </button>
                                    </div>
                                </form>
                                <div className="mt-4 text-center">
                                    <button
                                        className="text-brandRed font-bold hover:underline"
                                        onClick={() => openModal('login')}
                                    >
                                        Masz już konto? Zaloguj się
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}

        </>
    );
}
