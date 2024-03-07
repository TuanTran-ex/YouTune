import { all } from 'redux-saga/effects';
import { authSaga } from '../features/auth/authSaga';
import profileSaga from 'features/profile/profileSaga';
import citySaga from 'features/city/citySaga';
import createPostSaga from 'features/create/createPostSaga';
import searchSaga from 'features/search/searchSaga';
import homeSaga from 'features/home/homeSaga';
import personSaga from 'features/personPage/personSaga';

export default function* rootSaga() {
    yield all([
        authSaga(),
        profileSaga(),
        citySaga(),
        createPostSaga(),
        searchSaga(),
        homeSaga(),
        personSaga(),
    ]);
}
