//@ts-nocheck
import { takeLatest, call, put, select } from 'redux-saga/effects';
import _ from 'lodash';

import { getUser } from './api';

import { userGetSuccess, userGetError, userGetInit } from './getUserReducer';
import { userLoggedInSuccess, userLoggedInFail } from './userInfReducer';

function* getUserWorkerSaga(action){
    let payload = null;

    try{
        payload = yield call(getUser);
        console.log(payload);
        yield put(userLoggedInSuccess(payload.username));
    }
    catch(error){
        localStorage.removeItem('token');
        console.log("ERROR YOUR USER IS NOT LOGGEDIN");
        yield put(userGetError(error));
        yield put(userLoggedInFail())
        return null;
    }

    yield put(userGetSuccess(payload));
};

export default function* getUserWatcherSaga(){
    yield takeLatest(userGetInit, getUserWorkerSaga);
};
