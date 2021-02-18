// @ts-nocheck
import { takeLatest, call, put, select } from 'redux-saga/effects';
import _ from 'lodash';

import { getCartItemsApi, deleteCartItemApi, removeOneItemFromCartApi } from './api';

import {
    getCartItemsStart,
    getCartItemsSuccess,
    getCartItemsError,
    getCartItems404,
} from './getCartItemsSlice';

import {
    deleteCartItemInit,
    deleteCartItemSuccess,
    deleteCartItemError
} from './deleteCartItemSlice';

import {
    removeOneItemFromCartStart,
    removeOneItemFromCartSuccess,
    removeOneItemFromCartError,
} from './removeOneItemFromCartSlice';


function* getCartItemsSaga(){
    let payload = null; 
    try{
        payload = yield call(getCartItemsApi);
    }
    catch(error){
        if(error.response.status === 404){
            yield put(getCartItems404());
            console.log("ERR RESPONSE IN GET CART ITEMS: ", error.response);
        }
        else{
            yield put(getCartItemsError(error));
            return null;
        }
    }
    yield put(getCartItemsSuccess(payload));
};


function* deleteCartItemSaga(action){
    const itemId = _.get(action, 'payload', '');
    let payload = null; 
    try{
        payload = yield call(deleteCartItemApi, itemId);
    }
    catch(error){
        yield put(deleteCartItemError(error));
        return null;
    }
    yield put(deleteCartItemSuccess(payload));
};


function* removeOneItemFromCartSaga(action){
    const slug = _.get(action, 'payload', '');
    let payload = null; 
    try{
        payload = yield call(removeOneItemFromCartApi, slug);
    }
    catch(error){
        yield put(removeOneItemFromCartError(error));
        return null;
    }
    yield put(removeOneItemFromCartSuccess(payload));
};

export default function* CartWatcherSaga(){
    yield takeLatest(getCartItemsStart, getCartItemsSaga);
    yield takeLatest(deleteCartItemInit, deleteCartItemSaga);
    yield takeLatest(removeOneItemFromCartStart, removeOneItemFromCartSaga);
};
