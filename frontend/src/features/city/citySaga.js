import cityApi from 'api/cityApi';
import { call, put, takeLatest } from 'redux-saga/effects';
import { cityActions } from './citySlice';

function* fetchCityList() {
    try {
        const response = yield call(cityApi.getAll);
        yield put(cityActions.fetchCityListSuccess(response.data));
    } catch (error) {
        console.log(error);
    }
}

function* fetchWardListOfCity(action) {
    try {
        const responeOfWardList = yield call(
            cityApi.getCityById,
            action.payload,
        );
        yield put(
            cityActions.fetchWardListOfCitySuccess(
                responeOfWardList.data.wards,
            ),
        );
    } catch (error) {
        console.log(error);
    }
}

export default function* citySaga() {
    yield takeLatest(cityActions.fetchCityList, fetchCityList);
    yield takeLatest(cityActions.fetchWardListOfCity, fetchWardListOfCity);
}
