import React from 'react';
import { Link } from 'react-router-dom';

export default function Error404() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen ">
            <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
            <p className="text-2xl text-gray-700 mb-6">Strona nie została znaleziona.</p>
            <Link
                to="/"
                className="px-6 py-3 bg-brandRed text-white text-lg rounded-lg hover:bg-red-950 transition duration-200"
            >
                Powrót na stronę główną
            </Link>
        </div>
    );
}
