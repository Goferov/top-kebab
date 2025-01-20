import React from 'react';

export default function Loader() {
    return (
        <div className="flex items-center justify-center min-h-96 ">
            <div className="text-center">
                <div className="relative w-16 h-16 mb-7 mx-auto">
                    <div className="absolute inset-0 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="text-lg text-gray-700 font-semibold">
                    Ładowanie...
                </p>
            </div>
        </div>
    );
}
