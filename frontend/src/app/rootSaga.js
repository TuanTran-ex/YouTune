import { all } from 'redux-saga/effects';
import { authSaga } from '../features/auth/authSaga';

export default function* rootSaga() {
    yield all([authSaga()]);
}
