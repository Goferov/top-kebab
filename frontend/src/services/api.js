import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/api`;

export const api = axios.create({
    baseURL: API_URL
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export function getRestaurants(params = {}) {
    // params = { city: 'Krakow', name: 'Efes', sort: 1, limit: 10, publicate: 'true' }
    return api.get('/restaurants', { params });
}

export function getRestaurant(id) {
    return api.get(`/restaurants/${id}`);
}

export function deleteRestaurant(id) {
    return api.delete(`/restaurants/${id}`);
}

export function togglePublish(id) {
    return api.put(`/restaurants/${id}/toggle-publish`);
}

export function saveRestaurant(formData) {
    return api.post('/restaurants', formData);
}

export function updateRestaurant(id, formData) {
    return api.put(`/restaurants/${id}`, formData);
}

export function storeReview(restaurantId, data) {
    return api.post(`/restaurants/${restaurantId}/reviews`, data);
}

export function deleteReview(restaurantId, reviewId) {
    return api.delete(`/restaurants/${restaurantId}/reviews/${reviewId}`);
}

export function login(credentials) {
    return api.post('/login', credentials);
}

export function register(data) {
    return api.post('/register', data);
}

export function logout() {
    return api.post('/logout');
}

export function changePassword(data) {
    return api.post('/change-password', data);
}

export function getUser() {
    return api.get('/user');
}