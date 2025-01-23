import React, { useState } from 'react';
import { useModal } from '../services/modal';
import { register } from '../services/api';

export default function RegisterModal() {
    const { closeModal, openModal, setLoginMessage } = useModal();
    const [registerForm, setRegisterForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [registerError, setRegisterError] = useState('');

    const handleRegisterChange = (e) => {
        setRegisterForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setRegisterError('');

        if (!registerForm.name || !registerForm.email || !registerForm.password) {
            setRegisterError('Fill in all fields.');
            return;
        }
        if (registerForm.password !== registerForm.confirmPassword) {
            setRegisterError('Passwords are not the same.');
            return;
        }

        try {
            await register({
                name: registerForm.name,
                email: registerForm.email,
                password: registerForm.password,
                password_confirmation: registerForm.confirmPassword,
            });
            setLoginMessage('You have been successfully registered. You may log in.');
            closeModal();
            openModal('login');
        } catch (err) {
            setRegisterError(err.response?.data?.message || 'Registration error');
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={closeModal}
        >
            <div
                className="bg-white rounded-2xl shadow-lg w-11/12 max-w-md p-5"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-4xl font-bold mb-4 text-center">Registration</h2>
                {registerError && (
                    <p className="text-red-500 font-semibold mb-3">{registerError}</p>
                )}
                <form onSubmit={handleRegisterSubmit}>
                    <div className="mb-4">
                        <input
                            name="name"
                            type="text"
                            className="w-full border-black border rounded-2xl shadow-sm px-3 py-3"
                            placeholder="Name"
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
                            placeholder="Password"
                            value={registerForm.password}
                            onChange={handleRegisterChange}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            name="confirmPassword"
                            type="password"
                            className="w-full border-black border rounded-2xl shadow-sm px-3 py-3"
                            placeholder="Repeat password"
                            value={registerForm.confirmPassword}
                            onChange={handleRegisterChange}
                        />
                    </div>
                    <div className="flex justify-between items-center flex-col">
                        <button
                            type="submit"
                            className="bg-brandRed text-white py-2 px-4 rounded-2xl w-full hover:bg-red-500"
                        >
                            Register
                        </button>
                        <button
                            type="button"
                            className="text-gray-500 mt-3 hover:text-gray-700"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                </form>
                <div className="mt-4 text-center">
                    <button
                        className="text-brandRed font-bold hover:underline"
                        onClick={() => openModal('login')}
                    >
                        Already have an account? Log in
                    </button>
                </div>
            </div>
        </div>
    );
}
