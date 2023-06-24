import config from '../config';
import axiosClient from './axiosClient';

class ProfileApi {
    getProfile = () => {
        const url = `${config.apiRoutes.profile}`;
        return axiosClient.get(url);
    };

    updateProfile = (params) => {
        const url = `${config.apiRoutes.profile}`;
        return axiosClient.patch(url, params);
    };

    uploadAvatar = (params) => {
        const url = `${config.apiRoutes.upload}`;
        return axiosClient.post(url, params);
    };
}

const profileApi = new ProfileApi();
export default profileApi;
