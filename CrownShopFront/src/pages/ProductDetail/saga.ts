//@ts-nocheck
import { takeLatest, call, put, select } from 'redux-saga/effects';
import _ from 'lodash';

import { 
    getDetailItemApi,
} from './api';

import { 
    getDetailProductInit,
    getDetailProductSuccess,
    getDetailProductError
} from './getDetailSlice';


function* getProductDetailWorkerSaga(action){
    const productID = _.get(action, 'payload', '')
    let payload = null;

    try{
        payload = yield call(getDetailItemApi, productID);
    }
    catch(error){
        yield put(getDetailProductError(error));
        return null;
    }
    yield put(getDetailProductSuccess(payload));
}

export default function* getProductDetailWatcherSaga(){
    yield takeLatest(getDetailProductInit, getProductDetailWorkerSaga);
};