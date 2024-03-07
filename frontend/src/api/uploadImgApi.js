import config from '../config';
import axiosClient from './axiosClient';

class UploadImgApi {
    uploadAvatar = (params) => {
        const url = `${config.apiRoutes.upload}`;
        return axiosClient.post(url, params);
    };
}

const uploadImgApi = new UploadImgApi();
export default uploadImgApi;
