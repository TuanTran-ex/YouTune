import config from '../config';
import axiosClient from './axiosClient';

class ProfileApi {
    getProfile = (params) => {
        const url = `${config.apiRoutes.profile}`;
        return axiosClient.get(url, {
            params: params,
        });
    };

    updateProfile = (params) => {
        const url = `${config.apiRoutes.profile}`;
        return axiosClient.patch(url, params);
    };

    uploadAvatar = (params) => {
        const url = `${config.apiRoutes.upload}`;
        return axiosClient.post(url, params);
    };

    changePassword = (params) => {
        const url = `${config.apiRoutes.changePassword}`;
        return axiosClient.put(url, params);
    };
}

const profileApi = new ProfileApi();
export default profileApi;
