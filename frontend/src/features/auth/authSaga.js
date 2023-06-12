import authApi from 'api/authApi';
import config from 'config';
import { push } from 'connected-react-router';
import { call, delay, fork, put, take, takeLatest } from 'redux-saga/effects';
import { authActions } from './authSlice';
import message from '../../utils/message';
import { messagesToasts } from 'constants/messageToast';

function* handleLogin(payload) {
    //Login success
    try {
        // Call API
        const params = yield call(authApi.login, payload);
        localStorage.setItem('access_token', params.data.token);
        // dispatch action
        yield put(authActions.loginSuccess(params.data.user));
        yield put(push(`${config.routes.home}`));
    } catch (error) {
        yield put(authActions.loginFailed(console.error.message));
        yield message(messagesToasts.loginFail);
    }
}

// "react-redux": "^8.0.7",

function* handleLogout() {
    yield delay(500);
    localStorage.removeItem('access_token');

    //Redirect to login page
    yield put(push(`${config.routes.login}`));
}

function* watchingLoginFlow() {
    const isLoggedIn = localStorage.getItem('access_token');
    while (!isLoggedIn) {
        console.log('Watch login');
        const action = yield take(authActions.login.type);
        yield fork(handleLogin, action.payload);
    }
}

function* handleRegister(payload) {
    try {
        yield call(authApi.register, payload);
        console.log('payload: ', payload);
        yield put(push(`${config.routes.login}`));
    } catch (error) {
        console.log(error);
        yield put(authActions.registerFailed(console.error.message));
    }
}

export function* authSaga() {
    yield fork(watchingLoginFlow);
    yield takeLatest(authActions.logout, handleLogout);
    yield takeLatest(authActions.register, handleRegister);
}
