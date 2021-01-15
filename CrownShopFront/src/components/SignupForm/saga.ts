import { takeLatest, call, put, select } from 'redux-saga/effects';
import _ from 'lodash';

import {
    handle_signup_api,
} from "./api";

import {
    INIT_CREATE_USER,
} from './constants';


import {
    createUserSuccessAction,
    createUserErrorAction,
} from './actions'


function* signUpSaga(action){
    const signupData = _.get(action, 'signupData', null);
    let payload = null; 

    try{
        payload = yield call(handle_signup_api, signupData);
    }
    catch(error){
        yield put(createUserErrorAction(error));
        return null;
    }

    yield put(createUserSuccessAction(payload));

};


export default function* authenticationSaga(){
    yield takeLatest(INIT_CREATE_USER, signUpSaga);
};