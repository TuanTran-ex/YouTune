import createApi from 'api/createApi';
import config from 'config';
import { push } from 'connected-react-router';
import { messagesToasts } from 'constants/messageToast';
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { messageError, messageSuccess } from 'utils/message';
import { createPostActions } from './createPostSlice';

function* handleCreateNewPost(payload) {
    try {
        const response = yield call(createApi.createPost, payload.payload);
        yield put(createPostActions.createNewPostSuccess(response));
        if (response.data) {
            yield put(push(`${config.routes.profile}`));
            yield messageSuccess(messagesToasts.createPostSuccess);
        }
    } catch (error) {
        yield messageError(messagesToasts.createPostFail);
    }
}

function* handleDeletePost(payload) {
    try {
        const response = yield call(createApi.deletePost, payload.payload);
        if (response) {
            yield messageSuccess(messagesToasts.deleteSuccess);
            yield delay(400);
            yield put(createPostActions.deletePostSuccess());
        }
    } catch (error) {
        yield messageError(messagesToasts.deleteFail);
    }
}

function* handleUpdatePost(payload) {
    try {
        const response = yield call(createApi.updatePost, payload.payload);
        if (response) {
            yield messageSuccess(messagesToasts.updateSucess);
            yield delay(500);
            yield put(createPostActions.updatePostSuccess());
        }
    } catch (error) {
        yield messageError(messagesToasts.updateFail);
    }
}

export default function* createPostSaga() {
    yield takeLatest(createPostActions.createNewPost, handleCreateNewPost);
    yield takeLatest(createPostActions.deletePost, handleDeletePost);
    yield takeLatest(createPostActions.updatePost, handleUpdatePost);
}
