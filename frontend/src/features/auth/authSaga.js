import authApi from 'api/authApi';
import config from 'config';
import { push } from 'connected-react-router';
import { messagesToasts } from 'constants/messageToast';
import { call, put, takeLatest } from 'redux-saga/effects';
import { messageError, messageSuccess, messageWarning } from 'utils/message';
import { authActions } from './authSlice';

function* handleLogin(payload) {
    try {
        // Call API
        const params = yield call(authApi.login, payload);
        localStorage.setItem('access_token', params.data.token);
        yield put(authActions.loginSuccess(params.data.user));
        yield put(push(`${config.routes.home}`));
        yield messageSuccess(messagesToasts.loginSuccess);
    } catch (error) {
        yield messageError(messagesToasts.loginFail);
    }
}

function* handleLogout() {
    localStorage.removeItem('access_token');
    yield call(authApi.logout);
    yield put(push(`${config.routes.login}`));
}

function* handleRegister(payload) {
    try {
        yield call(authApi.register, payload);
        yield put(push(`${config.routes.login}`));
        yield messageSuccess(messagesToasts.registerSuccess);
    } catch (error) {
        const errorMessage = error.response.data.errors.email.message;
        if (errorMessage.includes('already'))
            yield messageWarning(messagesToasts.registerWarning);
        else yield messageError(messagesToasts.registerFail);
    }
}

export function* authSaga() {
    yield takeLatest(authActions.login, handleLogin);
    yield takeLatest(authActions.logout, handleLogout);
    yield takeLatest(authActions.register, handleRegister);
}
