import { call, put, takeLatest } from 'redux-saga/effects';
import { homeActions } from './homeSlice';
import userApi from 'api/userApi';

function* handleGetArraySuggestFollow(payload) {
    try {
        const response = yield call(userApi.getUsers, payload);
        yield put(homeActions.fetchArraySuggestFollowSuccess(response));
    } catch (error) {
        console.log('error', error);
    }
}

function* handleRequestToFollow(payload) {
    try {
        const response = yield call(userApi.updateStatus, payload.payload);
        yield put(homeActions.responseFollow(response));
    } catch (error) {
        console.log('error', error);
    }
}

export default function* homeSaga() {
    yield takeLatest(
        homeActions.fetchSuggestFollow,
        handleGetArraySuggestFollow,
    );

    yield takeLatest(homeActions.sendRequestToFollow, handleRequestToFollow);
}
