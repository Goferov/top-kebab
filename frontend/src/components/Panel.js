import React, { useState } from 'react';
import PanelNav from './PanelNav';

function Panel() {
    const [message, setMessage] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const handleChangePassword = (e) => {
        e.preventDefault();
        const current = e.target.currentPassword.value;
        const newPass = e.target.newPassword.value;
        const repeat = e.target.repeatNewPassword.value;

        if (newPass !== repeat) {
            setMessage('Nowe hasła się nie zgadzają!');
            return;
        }


    };

    return (
        <section className="admin-panel container mx-auto my-6">
            <h1 className="text-2xl font-bold mb-4">Twoje konto</h1>

            <div className="user-panel flex flex-col md:flex-row gap-6">
                {/* Lewa kolumna: nawigacja */}
                <div className="md:w-1/4">
                    <PanelNav isAdmin={isAdmin} />
                </div>

                <div className="content md:w-3/4">
                    {message && (
                        <p className="text-lg font-semibold mb-2">
                            {message}
                        </p>
                    )}

                    <form
                        className="user-form font-medium  grid grid-cols-1 lg:grid-cols-2 gap-4"
                        onSubmit={handleChangePassword}
                        method="post"
                        action="/changePassword"
                    >
                        <input
                            className="input border border-black rounded-2xl py-2 px-3 w-full"
                            placeholder="Aktualne hasło"
                            type="password"
                            name="currentPassword"
                            required
                        />

                        <input
                            className="input border border-black rounded-2xl py-2 px-3 w-full"
                            placeholder="Nowe hasło"
                            type="password"
                            name="newPassword"
                            required
                        />

                        <input
                            className="input border border-black rounded-2xl py-2 px-3 w-full"
                            placeholder="Powtórz hasło"
                            type="password"
                            name="repeatNewPassword"
                            required
                        />

                        <button
                            type="submit"
                            className="button bg-brandRed text-white rounded-2xl w-full py-2 font-medium text-lg hover:bg-red-700 transition-colors"
                        >
                            Zmień hasło
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Panel;
