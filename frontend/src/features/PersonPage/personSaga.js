import { call, put, takeLatest } from 'redux-saga/effects';
import { personActions } from './personSlice';
import userApi from 'api/userApi';

function* handlefFetchUserData(payload) {
    try {
        const response = yield call(userApi.getUser, payload.payload);
        yield put(personActions.fetchUserDataSuccess(response));
    } catch (error) {
        console.log('error', error);
    }
}

export default function* personSaga() {
    yield takeLatest(personActions.fetchUserData, handlefFetchUserData);
}
