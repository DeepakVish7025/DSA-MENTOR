import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'https://leetcode-1-d9rb.onrender.com',
    headers: {
        'Content-Type': 'application/json'
    }
});

// ✅ interceptor ADD karo
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosClient;