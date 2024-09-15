import { parseCookies, destroyCookie } from "nookies";
import axios from 'axios';

// URL da sua API
const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});


api.interceptors.request.use((config) => {
    const cookies = parseCookies();
    const token = cookies['token'];

    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});


api.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const { response } = error;

    if (response?.status === 401) {
        destroyCookie(null, 'token');
        window.location.href = '/login';
    }

    return Promise.reject(error);
});

export default api;
