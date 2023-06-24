import axios from 'axios';

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
    (error) => {
        throw error;
    },
);

export default axiosClient;
