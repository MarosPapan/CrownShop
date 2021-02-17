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
    const paymentInf = _.get(action, 'payload', null);
    console.log('PaymentInf in saga: ', paymentInf);
    let payload = null; 

    try{
        payload = yield call(paymentApi, paymentInf);
    }
    catch(error){
        yield put(paymentError(error));
        return null;
    }
    yield put(paymentSuccess(payload));
};

export default function* paymentWatcherSaga(){
    yield takeLatest(paymentInit, paymentWorkerSaga);
};
