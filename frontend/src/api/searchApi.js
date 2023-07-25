import config from '../config';
import axiosClient from './axiosClient';

class SearchApi {
    searchUserInfo = (params) => {
        const url = `${config.apiRoutes.users}`;
        return axiosClient.get(url, {
            params: params,
        });
    };
}

const searchApi = new SearchApi();
export default searchApi;
