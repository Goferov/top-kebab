import React from 'react';
import { Link } from 'react-router-dom';
import Logout from "./Logout";

function PanelNav({ isAdmin }) {
    return (
        <ul className="user-menu list-none border border-black">
            <li className="m-0">
                <Link
                    to="/panel"
                    className="flex items-center gap-1 px-3 py-1 hover:bg-brandRed border-b border-black"
                    title="Zmiana hasła"
                >
                    <i className="fa-solid fa-key"></i>
                    Zmiana hasła
                </Link>
            </li>

            {isAdmin && (
                <li className="m-0">
                    <Link
                        to="/restaurantList"
                        className="flex items-center gap-1 px-3 py-1 hover:bg-brandRed border-b border-black"
                        title="Lista restauracji"
                    >
                        <i className="fa-solid fa-list"></i>
                        Lista restauracji
                    </Link>
                </li>
            )}

            <li className="m-0">
                <Logout customClass="flex items-center gap-1 text-red-600 px-3 py-1 font-medium hover:bg-brandRed"/>
            </li>
        </ul>
    );
}

export default PanelNav;
