import { call, put, takeLatest } from 'redux-saga/effects';
import { messageError, messageSuccess } from 'utils/message';
import { createPostActions } from './createPostSlice';
import createApi from 'api/createApi';
import { messagesToasts } from 'constants/messageToast';
import { push } from 'connected-react-router';
import config from 'config';

function* handleCreateNewPost(payload) {
    try {
        const response = yield call(createApi.createPost, payload.payload);
        yield put(createPostActions.fetchPostCreate(response));
        if (response !== undefined) {
            yield put(push(`${config.routes.profile}`));
            yield messageSuccess(messagesToasts.createPostSuccess);
        }
    } catch (error) {
        yield messageError(messagesToasts.createPostFail);
    }
}

export default function* createPostSaga() {
    yield takeLatest(createPostActions.createNewPost, handleCreateNewPost);
}