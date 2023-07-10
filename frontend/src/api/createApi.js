import config from '../config';
import axiosClient from './axiosClient';

class CreateApi {
    createPost = (params) => {
        const url = `${config.apiRoutes.posts}`;
        return axiosClient.post(url, params);
    };

    deletePost = (id) => {
        const url = `${config.apiRoutes.posts}/${id}`;
        return axiosClient.delete(url);
    };

    updatePost = (params) => {
        const url = `${config.apiRoutes.posts}/${params.id}`;
        return axiosClient.patch(url, { content: params.content });
    };
}

const createApi = new CreateApi();
export default createApi;
