import config from '../config';
import axiosClient from './axiosClient';

class CreateApi {
    createPost = (params) => {
        const url = `${config.apiRoutes.posts}`;
        return axiosClient.post(url, params);
    };

    deletePost = (params) => {
        const url = `${config.apiRoutes.deletePost}`;
        return axiosClient.delete(url, params);
    };
}

const createApi = new CreateApi();
export default createApi;
