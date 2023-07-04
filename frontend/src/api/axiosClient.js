import axios from 'axios';
import authApi from './authApi';
import { codeError } from 'utils/codeError';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.request.use(async (config) => {
    // Handle token here ...
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
        config.headers = { Authorization: 'Bearer ' + accessToken };
    }
    return config;
});
axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    async (error) => {
        if (error.response.data.code === codeError) {
            const refresh = await authApi.refreshToken();
            localStorage.setItem('access_token', refresh.data.token);
        }
    },
);

export default axiosClient;
