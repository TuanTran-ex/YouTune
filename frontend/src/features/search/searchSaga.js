import { call, put, takeLatest } from 'redux-saga/effects';
import { searchActions } from './searchSlice';
import searchApi from 'api/searchApi';

function* handleResultUserInfo(action) {
    try {
        const params = {
            search: action.payload,
        };
        const response = yield call(searchApi.searchUserInfo, params);
        yield put(searchActions.searchResult(response?.data));
    } catch (error) {
        console.log(error);
    }
}

export default function* searchSaga() {
    yield takeLatest(searchActions.searchUserInfo, handleResultUserInfo);
}
