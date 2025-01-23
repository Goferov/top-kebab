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
            setLoginError('Fill in all fields.');
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
            setLoginError(err.response?.data?.message || 'Incorrect login data');
        }
    };

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
            closeModal();
            setRegisterForm({ name: '', email: '', password: '', confirmPassword: '' });
            setLoginMessage('You have been successfully registered. You may log in.');
            openModal('login');
        } catch (err) {
            setRegisterError(err.response?.data?.message || 'Registration error');
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
                                TopKebab is not just a portal, it's a meeting place for gourmet kebabs. TopKebab is a team of passionate people who make sure that every kebab featured on our site is worthy of the attention.
                            </p>
                        </div>
                        <div>
                            <h6 className="uppercase mb-3 font-bold">Contact</h6>
                            <ul className="list-none relative ps-4">
                                <div className="absolute left-0 bottom-0 top-0 h-100 w-1 bg-brandRedLight"></div>
                                <li>
                                    <a href="tel:+48514343443" className="hover:text-red-400 flex items-center">
                                        <i className="fa-solid fa-phone-flip me-2"></i> +48 514 343 443
                                    </a>
                                </li>
                                <li>
                                    <a href="mailto:office@topkebab.pl" className="hover:text-red-400 flex items-center">
                                        <i className="fa-solid fa-envelope me-2"></i> office@topkebab.pl
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
                                    <a href="/restaurant">Restaurants</a>
                                </li>
                                <li className="hover:text-red-400">
                                    <a href="/contact">Contact</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="bg-brandBlack">
                    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 py-1 text-xs text-center md:text-start">
                        <div>TOPKEBAB &copy; {new Date().getFullYear()} All rights reserved.</div>
                        <div className="hidden md:block"></div>
                        <div className="md:text-end">Realisation: Marcin Godfryd</div>
                    </div>
                </div>
            </footer>

        </>
    );
}
