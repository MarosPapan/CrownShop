//@ts-nocheck
import { takeLatest, call, put, select } from 'redux-saga/effects';
import _ from 'lodash';

import { 
    getProductsApi, 
    addToCartApi, 
} from './api';

import { 
    getProductsInit, 
    getProductsSuccess,
    getProductsError,
} from './getProductsSlice';

import {
    addToCartStart,
    addToCartSuccess,
    addToCartError
} from './addToCartSlice';


function* getProductsWorkerSaga(){
    let payload = null;

    try{
        payload = yield call(getProductsApi);
    }
    catch(error){
        yield put(getProductsError(error));
        return null;
    }
    yield put(getProductsSuccess(payload));
}

function* addToCartWorkerSaga(action){
    const slug = _.get(action, 'payload', null);
    console.log("Payload: ", slug);
    let payload = null 

    try{
        payload = yield call(addToCartApi, slug);
    }
    catch(error){
        yield put(addToCartError(error));
        return null;
    }
    yield put(addToCartSuccess(payload));

}

export default function* ProductsWatcherSaga(){
    yield takeLatest(getProductsInit, getProductsWorkerSaga);
    yield takeLatest(addToCartStart, addToCartWorkerSaga);
};