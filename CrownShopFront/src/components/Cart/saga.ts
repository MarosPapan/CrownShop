// @ts-nocheck
import { takeLatest, call, put, select } from 'redux-saga/effects';
import _ from 'lodash';

import { getCartItemsApi } from './api';

import {
    getCartItemsStart,
    getCartItemsSuccess,
    getCartItemsError,
} from './getCartItemsSlice';


function* getCartItemsSaga(){
    let payload = null; 
    try{
        payload = yield call(getCartItemsApi);
    }
    catch(error){
        yield put(getCartItemsError(error));
        return null;
    }
    yield put(getCartItemsSuccess(payload));
};

export default function* CartWatcherSaga(){
    yield takeLatest(getCartItemsStart, getCartItemsSaga);
};
