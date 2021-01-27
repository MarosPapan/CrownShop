//@ts-nocheck
import { takeLatest, call, put, select } from 'redux-saga/effects';
import _ from 'lodash';

import { paymentApi } from './api';

import {
    paymentInit,
    paymentSuccess,
    paymentError,
} from './paymentSlice';


function* paymentWorkerSaga(action){
    const token = _.get(action, 'payload', null);
    //console.log("This is token in PAYMENT SAGA: ", token);
    let payload = null; 

    try{
        payload = yield call(paymentApi, token);
    }
    catch(error){
        yield put(paymentError(error));
        return null;
    }
    console.log("PAYLOAD IN API: ", payload)
    yield put(paymentSuccess(payload));
};

export default function* paymentWatcherSaga(){
    yield takeLatest(paymentInit, paymentWorkerSaga);
};
