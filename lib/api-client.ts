import axios from 'axios';
import { navigateTo } from '@/lib/navigation';

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://localhost:5001/api/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// On 401, navigate to login — backend cookie is gone or expired.
// Skip redirect when already on an auth page (unauthenticated requests are expected there).
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && typeof window !== 'undefined') {
            const authPaths = ['/login', '/register', '/forgot-password', '/reset-password'];
            const onAuthPage = authPaths.some((p) => window.location.pathname.startsWith(p));
            if (!onAuthPage) {
                navigateTo('/login');
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
