import authApi from 'api/authApi';
import config from 'config';
import { push } from 'connected-react-router';
import { messagesToasts } from 'constants/messageToast';
import { call, fork, put, take, takeLatest } from 'redux-saga/effects';
import message from '../../utils/message';
import { authActions } from './authSlice';

function* handleLogin(payload) {
    try {
        // Call API
        const params = yield call(authApi.login, payload);
        localStorage.setItem('access_token', params.data.token);
        yield put(authActions.loginSuccess(params.data.user));
        yield put(push(`${config.routes.home}`));
    } catch (error) {
        yield put(authActions.loginFailed(console.error.message));
        yield message(messagesToasts.loginFail);
    }
}

function* handleLogout() {
    localStorage.removeItem('access_token');
    yield put(push(`${config.routes.login}`));
}

function* watchingLoginFlow() {
    const isLoggedIn = localStorage.getItem('access_token');
    while (!isLoggedIn) {
        const action = yield take(authActions.login.type);
        yield fork(handleLogin, action.payload);
    }
}

function* handleRegister(payload) {
    try {
        yield call(authApi.register, payload);
        yield put(push(`${config.routes.login}`));
    } catch (error) {
        yield put(authActions.registerFailed(console.error.message));
    }
}

export function* authSaga() {
    yield fork(watchingLoginFlow);
    yield takeLatest(authActions.logout, handleLogout);
    yield takeLatest(authActions.register, handleRegister);
}
