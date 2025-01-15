import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const api = axios.create({
    baseURL: API_URL
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export function getRestaurants() {
    return api.get('/restaurants');
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

