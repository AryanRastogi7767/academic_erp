import axios from 'axios';

// Create an axios instance
const API = axios.create({
    baseURL: 'http://localhost:8080/api',  // Change this URL to match your backend URL
});

// Add request interceptor to include JWT token in headers
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default API;
