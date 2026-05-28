import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Attach stored JWT as Bearer header on every request
apiClient.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('ez_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

// On 401, clear auth state and redirect to login
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && typeof window !== 'undefined') {
            localStorage.removeItem('ez_token');
            document.cookie = 'ez_token=; path=/; max-age=0';
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default apiClient;
