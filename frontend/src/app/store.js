import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import profileReducer from 'features/profile/profileSlice';
import createSagaMiddleware from 'redux-saga';
import { history } from 'utils';
import authReducer from '../features/auth/authSlice';
import rootSaga from './rootSaga';
import cityReducer from 'features/city/citySlice';

const rootReducer = combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    profile: profileReducer,
    city: cityReducer,
});

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            thunk: false,
        }).concat(sagaMiddleware, routerMiddleware(history)),
});

sagaMiddleware.run(rootSaga);
