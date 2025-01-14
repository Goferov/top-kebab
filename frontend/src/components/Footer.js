import React, { useState } from 'react';
import { useModal } from '../services/modal';

function Footer() {
    const { modalType, openModal, closeModal } = useModal();

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
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                                fermentum vitae dolor ut cursus. Phasellus tempor congue nunc.
                                Nullam eget vestibulum nibh.
                            </p>
                        </div>
                        <div>
                            <h6 className="uppercase mb-3 font-bold">Kontakt</h6>
                            <ul className="list-none">
                                <li>
                                    <a
                                        href="tel:+48514343443"
                                        className="hover:text-red-400 flex items-center"
                                    >
                                        <i className="fa-solid fa-phone-flip me-2"></i> +48 514 343
                                        443
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="mailto:redakcja@topkebab.pl"
                                        className="hover:text-red-400 flex items-center"
                                    >
                                        <i className="fa-solid fa-envelope me-2"></i>{' '}
                                        redakcja@topkebab.pl
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h6 className="uppercase mb-3 font-bold">Menu</h6>
                            <ul className="list-none">
                                <li className="hover:text-red-400">
                                    <a href="#">Home</a>
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
                        <div>
                            TOPKEBAB &copy; {new Date().getFullYear()} Wszelkie prawa
                            zastrzeżone.
                        </div>
                        <div className="hidden md:block"></div>
                        <div className="md:text-end">
                            Realizacja: Marcin Godfryd
                        </div>
                    </div>
                </div>
            </footer>

            <footer className="text-white">
                {/* Footer content */}
            </footer>

            {/* Modal Logowanie */}
            {modalType === 'login' && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={closeModal}>
                    <div className="bg-white rounded-2xl shadow-lg w-11/12 max-w-md p-5" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-4xl font-bold mb-4 text-center">Logowanie</h2>
                        <form>
                            <div className="mb-4">
                                <input
                                    id="email"
                                    type="email"
                                    className="w-full border-black border rounded-2xl shadow-sm px-3 py-3"
                                    placeholder="Email"
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    id="password"
                                    type="password"
                                    className="w-full border-black border rounded-2xl shadow-sm px-3 py-3"
                                    placeholder="Hasło"
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

            {/* Modal Rejestracja */}
            {modalType === 'register' && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"  onClick={closeModal}>
                    <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-5" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-4xl font-bold mb-4 text-center">Rejestracja</h2>
                        <form>
                            <div className="mb-4">
                                <input
                                    id="name"
                                    type="text"
                                    className="w-full border-black border rounded-2xl shadow-sm px-3 py-3"
                                    placeholder="Nazwa"
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    id="email"
                                    type="email"
                                    className="w-full border-black border rounded-2xl shadow-sm px-3 py-3"
                                    placeholder="Email"
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    id="password"
                                    type="password"
                                    className="w-full border-black border rounded-2xl shadow-sm px-3 py-3"
                                    placeholder="Hasło"
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    id="confirm-password"
                                    type="password"
                                    className="w-full border-black border rounded-2xl shadow-sm px-3 py-3"
                                    placeholder="Powtórz hasło"
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
    );
}

export default Footer;
