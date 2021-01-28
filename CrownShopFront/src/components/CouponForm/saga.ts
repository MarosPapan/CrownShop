import { takeLatest, call, put, select } from 'redux-saga/effects';
import _ from 'lodash';

import {
    handleAddCouponApi
} from "./api";

import {
    addCouponSuccess,
    addCouponInit,
    addCouponError,
} from './addCouponSlice';


function* addCouponWorkerSaga(action){
    const coupon = _.get(action, 'payload', null);
    let payload = null; 

    try{
        payload = yield call(handleAddCouponApi, coupon);
    }
    catch(error){
        yield put(addCouponError(error));
        return null;
    }

    yield put(addCouponSuccess(payload));

};

export default function* addCouponWatcherSaga(){
    yield takeLatest(addCouponInit, addCouponWorkerSaga);
};