import config from '../config';
import axiosClient from './axiosClient';

class AuthApi {
    login = (params) => {
        const url = `${config.apiRoutes.login}`;
        return axiosClient.post(url, params.payload);
    };

    logout = (params) => {
        const url = `${config.apiRoutes.logout}`;
        return axiosClient.post(url, params);
    };

    register = (params) => {
        const url = `${config.apiRoutes.register}`;
        return axiosClient.post(url, params.payload);
    };

    refreshToken = () => {
        const url = '/auth/refresh';
        return axiosClient.post(url);
    };
}

const authApi = new AuthApi();
export default authApi;
