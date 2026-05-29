import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// On 401, redirect to login — backend cookie is gone or expired
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && typeof window !== 'undefined') {
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default apiClient;
