import { takeLatest, call, put, select } from 'redux-saga/effects';
import _ from 'lodash';

import {
    handle_login_api,
} from "./api";

import {
    INIT_LOGIN_USER,
} from './constants';


import {
    loginUserSuccessAction,
    loginUserErrorAction,
} from './actions'


function* loginWorkerSaga(action){
    const loginData = _.get(action, 'loginData', null);
    console.log("DATA IN LOGIN SAGA: ", loginData);
    let payload = null; 

    try{
        payload = yield call(handle_login_api, loginData);
    }
    catch(error){
        yield put(loginUserErrorAction(error));
        return null;
    }

    yield put(loginUserSuccessAction(payload));

};


export default function* loginWatcherSaga(){
    yield takeLatest(INIT_LOGIN_USER, loginWorkerSaga);
};