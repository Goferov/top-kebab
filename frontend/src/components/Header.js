import React from 'react';
import { useState } from "react";

function Header() {
    const [isMenuOpen, setMenuOpen] = useState(false);


    return (
        <header >
            <div className="bg-brandRed text-white text-xs py-3">
                <div className="container mx-auto flex  md:flex-row justify-between items-center gap-8">
                    <div className="flex md:justify-between">
                        <a href="tel:+48514343443" className="me-5 ">
                            <i className="fa-solid fa-phone-flip me-1 text-2xl md:text-xs"></i> <span className="hidden md:inline">+48 514 343 443</span>
                        </a>
                        <a href="mailto:redakcja@topkebab.pl" className="">
                            <i className="fa-solid fa-envelope md:me-1 text-2xl md:text-xs"></i> <span
                            className="hidden md:inline">redakcja@topkebab.pl</span>
                        </a>
                    </div>
                    <div>
                        <a id="login-btn" href="#" className="open-modal" data-modal="login-modal">
                            <i className="fa-solid fa-user md:me-1 text-2xl md:text-xs"></i> <span
                            className="hidden md:inline">Zaloguj się</span>
                        </a>
                    </div>
                </div>
            </div>
            <div className="bg-white border-b-2 border-b-brandGray shadow-md">
                <nav className="container">
                    <div className="flex flex-wrap items-center justify-between mx-auto py-4">
                        <a
                            href="/"
                            title="Home"
                            className="flex items-center space-x-3 rtl:space-x-reverse"
                        >
                            <img src="/logo.svg" alt="TopKebab logo" />
                        </a>
                        <div className="flex md:order-2,none">
                            <button
                                data-collapse-toggle="navbar-search"
                                type="button"
                                onClick={() => setMenuOpen(!isMenuOpen)}
                                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm  rounded-lg md:hidden  focus:outline-none focus:ring-2    "
                                aria-controls="navbar-search"
                                aria-expanded={isMenuOpen}
                            >
                                <span className="sr-only">Open main menu</span>
                                <svg
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 17 14"
                                    stroke-width="2"
                                >
                                    <path stroke="black" stroke-linecap="round" stroke-linejoin="round" d="M1 1h15M1 7h15M1 13h15" />
                                </svg>
                            </button>
                        </div>
                        <div
                            className={`items-center justify-between ${
                                isMenuOpen ? "block" : "hidden"
                            } w-full md:flex md:w-auto md:order-1`}
                            id="navbar-search"
                        >
                            <ul className="flex font-semibold flex-col p-4 md:p-0 mt-4  border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
                                <li>
                                    <a
                                        href="/"
                                        className="block py-2 px-3   md:hover:text-red-400 md:p-0"
                                        aria-current="page"
                                    >
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/restaurant"
                                        className="block py-2 px-3 rounded md:hover:text-red-400 md:p-0  "
                                    >
                                        Restauracje
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/contact"
                                        className="block py-2 px-3 rounded  md:hover:text-red-400  md:p-0  "
                                    >
                                        Kontakt
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;
