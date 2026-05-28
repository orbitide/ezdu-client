import axios from 'axios';
import { cookies } from 'next/headers';

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Cookie: cookies().toString(),
    },
});

export default apiClient;
