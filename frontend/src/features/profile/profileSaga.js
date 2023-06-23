import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { profileActions } from './profileSlice';
import profileApi from 'api/profileApi';
import { messageError, messageSuccess } from 'utils/message';
import { messagesToasts } from 'constants/messageToast';

function* handleGetUserProfile() {
    try {
        const response = yield call(profileApi.getProfile);
        yield put(profileActions.fetchProfileDataSuccess(response.data));
    } catch (error) {
        console.log(error);
    }
}

function* handleUpdateProfile(action) {
    try {
        yield call(profileApi.updateProfile, action.payload);
        yield messageSuccess(messagesToasts.uploadSucess);
    } catch (error) {
        yield messageError(messagesToasts.uploadFail);
    }
}

function* handleUpdateImage({ payload }) {
    try {
        const response = yield call(profileApi.uploadAvatar, payload);
        yield put(profileActions.updateProfileImageSuccess(response.data.url));
        yield delay(400);
        yield messageSuccess(messagesToasts.uploadSucess);
    } catch (error) {
        yield messageError(messagesToasts.uploadFail);
    }
}

export default function* profileSaga() {
    yield takeLatest(profileActions.fetchProfileData, handleGetUserProfile);
    yield takeLatest(profileActions.updateProfile, handleUpdateProfile);
    yield takeLatest(profileActions.fetchProfileImage, handleUpdateImage);
}
