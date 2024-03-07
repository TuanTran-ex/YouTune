import config from '../config';
import axiosClient from './axiosClient';

class CityApi {
    getAll = () => {
        const url = `${config.apiRoutes.city}`;
        return axiosClient.get(url);
    };
    getCityById = (id) => {
        const url = `${config.apiRoutes.city}/${id}`;
        return axiosClient.get(url);
    };
}

const cityApi = new CityApi();
export default cityApi;
