// API.js (frontend)
import axios from 'axios';

const API = axios.create({
    baseURL: 'http://192.168.101.6:3001/api/v1',  // Adjust to your backend URL
    timeout: 5000,
});

API.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Handle token expiration or invalidation here
            console.log("Token expired or invalid");
        }
        return Promise.reject(error);
    }
);

export default API;



