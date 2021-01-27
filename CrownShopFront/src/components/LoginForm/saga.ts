import { takeLatest, call, put, select } from 'redux-saga/effects';
import _ from 'lodash';

import {
    handle_login_api,
    getUserApi
} from "./api";

import {
    userLogInSuccess,
    userLogInError,
    userLogInInit,
    userGetInit
} from './logInUserSlice';


function* loginWorkerSaga(action){
    const loginData = _.get(action, 'payload', null);
    let payload = null; 

    try{
        payload = yield call(handle_login_api, loginData);
    }
    catch(error){
        yield put(userLogInError(error));
        return null;
    }

    yield put(userLogInSuccess(payload));

};


function* getUserWorkerSaga(action){
    let payload = null;

    try{
        payload = yield call(getUserApi);
    }
    catch(error){
        localStorage.removeItem('token');
        yield put(userLogInError(error));
        return null;
    }

    yield put(userLogInSuccess(payload));
};

export default function* loginWatcherSaga(){
    yield takeLatest(userLogInInit, loginWorkerSaga);
    yield takeLatest(userGetInit, getUserWorkerSaga);
};