import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { profileActions } from './profileSlice';
import profileApi from 'api/profileApi';
import { messageError, messageSuccess } from 'utils/message';
import { messagesToasts } from 'constants/messageToast';

function* handleGetUserProfile() {
    try {
        const params = {
            'full-data': 'true',
        };
        const response = yield call(profileApi.getProfile, params);
        yield put(profileActions.fetchProfileDataSuccess(response.data));
    } catch (error) {
        console.log(error);
    }
}

function* handleUpdateProfile(action) {
    try {
        yield call(profileApi.updateProfile, action.payload);
        yield messageSuccess(messagesToasts.updateSucess);
    } catch (error) {
        yield messageError(messagesToasts.updateFail);
    }
}

function* handleUpdateImage({ payload }) {
    try {
        const response = yield call(profileApi.uploadAvatar, payload);
        yield put(profileActions.updateProfileImageSuccess(response.data.url));
        yield delay(400);
        yield messageSuccess(messagesToasts.updateSucess);
    } catch (error) {
        yield messageError(messagesToasts.updateFail);
    }
}

function* handleChangePassword(action) {
    try {
        yield call(profileApi.changePassword, action.payload);
        yield messageSuccess(messagesToasts.updatePasswordSuccess);
    } catch (error) {
        if (error.response.status === 401)
            yield messageError(messagesToasts.updatePasswordFailToIncorrect);
        else yield messageError(messagesToasts.updatePasswordFail);
    }
}

export default function* profileSaga() {
    yield takeLatest(profileActions.fetchProfileData, handleGetUserProfile);
    yield takeLatest(profileActions.updateProfile, handleUpdateProfile);
    yield takeLatest(profileActions.fetchProfileImage, handleUpdateImage);
    yield takeLatest(profileActions.updatePassword, handleChangePassword);
}
