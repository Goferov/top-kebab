import React, { useState } from 'react';
import PanelNav from '../components/PanelNav';
import { changePassword } from '../services/api';
import { useUser } from '../contexts/UserContext';

function Panel() {
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState(null);
    const { user } = useUser();
    const isAdmin = user?.role_id === 1;

    const handleChangePassword = async (e) => {
        e.preventDefault();
        const current = e.target.currentPassword.value;
        const newPass = e.target.newPassword.value;
        const repeat = e.target.repeatNewPassword.value;

        if (newPass !== repeat) {
            setStatus('error');
            setMessage('New passwords don\'t match!');
            return;
        }

        if (newPass.length < 8) {
            setStatus('error');
            setMessage('The password must have at least 8 characters!');
            return;
        }

        try {
            const response = await changePassword({
                current_password: current,
                new_password: newPass,
                new_password_confirmation: repeat,
            });

            if (response.status === 200) {
                setStatus('success');
                setMessage('Password changed successfully!');
                e.target.reset();
            } else {
                throw new Error('Unexpected response status');
            }
        } catch (err) {
            setStatus('error');
            setMessage(err.response?.data?.message || 'Failed to change password.');
        }
    };

    return (
        <section className="admin-panel container mx-auto my-6">
            <h1 className="text-2xl font-bold mb-4">Your account</h1>

            <div className="user-panel flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4">
                    <PanelNav isAdmin={isAdmin} />
                </div>

                <div className="content md:w-3/4">
                    {message && (
                        <p
                            className={`text-lg font-semibold mb-2 ${
                                status === 'success' ? 'text-green-600' : 'text-red-600'
                            }`}
                        >
                            {message}
                        </p>
                    )}

                    <form
                        className="user-form font-medium grid grid-cols-1 lg:grid-cols-2 gap-4"
                        onSubmit={handleChangePassword}
                        method="post"
                    >
                        <input
                            className="input border border-black rounded-2xl py-2 px-3 w-full"
                            placeholder="Current password"
                            type="password"
                            name="currentPassword"
                            required
                        />

                        <input
                            className="input border border-black rounded-2xl py-2 px-3 w-full"
                            placeholder="New password"
                            type="password"
                            name="newPassword"
                            required
                        />

                        <input
                            className="input border border-black rounded-2xl py-2 px-3 w-full"
                            placeholder="Repeat password"
                            type="password"
                            name="repeatNewPassword"
                            required
                        />

                        <button
                            type="submit"
                            className="button bg-brandRed text-white rounded-2xl w-full py-2 font-medium text-lg hover:bg-red-700 transition-colors"
                        >
                            Change password
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Panel;
