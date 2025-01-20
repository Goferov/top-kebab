import {logout as apiLogout} from "../services/api";
import React from "react";

export default function Logout({ customClass }) {
    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await apiLogout();
            localStorage.removeItem('token');
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <a
            href="#"
            onClick={handleLogout}
            className={`hover:text-red-400 ${customClass}`}
        >
            <i className="fa-solid fa-power-off md:me-1 text-2xl md:text-xs"></i>
            <span className="hidden md:inline">Wyloguj</span>
        </a>
    );
}