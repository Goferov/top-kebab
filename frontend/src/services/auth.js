import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export async function login(email, password) {
    const response = await axios.post(`${API_URL}/login`, {
        email,
        password
    });
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
}

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}
