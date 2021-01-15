import { takeLatest, call, put, select } from 'redux-saga/effects';
import _ from 'lodash';

import {
    handle_signup_api,
} from "./api";

import {
    createUserInit,
    createUserSuccess,
    createUserError,
} from './signUpUserSlice';


function* signUpSaga(action){
    const signupData = _.get(action, 'payload', null);
    let payload = null; 

    try{
        payload = yield call(handle_signup_api, signupData);
    }
    catch(error){
        yield put(createUserError(error));
        return null;
    }

    yield put(createUserSuccess(payload));

};


export default function* authenticationSaga(){
    yield takeLatest(createUserInit, signUpSaga);
};