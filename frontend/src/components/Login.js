// src/components/Login.js
import React, { useState } from 'react';
import { login } from '../services/auth';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await login(email, password);
            window.location.href = '/';
        } catch (err) {
            setError('Niepoprawne dane logowania');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {error && <p>{error}</p>}
            <div>
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label>Hasło</label>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">Zaloguj</button>
        </form>
    );
}
