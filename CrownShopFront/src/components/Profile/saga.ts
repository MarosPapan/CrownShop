//@ts-nocheck
import { takeLatest, call, put, select, take } from 'redux-saga/effects';
import _ from 'lodash';

import { getAddressesApi, createAddressApi } from './api';

import {
    getAdressesInit,
    getAdressesSuccess,
    getAdressesError,
} from './getAdressesSlice'

import {
    createAddressInit,
    createAddressSuccess,
    createAddressError,
} from './createAddressSlice';


function* getAddressesSagaWorker(action){
    const addressType = _.get(action, 'payload', '');
    let payload = null;
    try{
        payload = yield call(getAddressesApi, addressType);
    }
    catch(error){
        yield put(getAdressesError(error));
        return null;
    }
    yield put(getAdressesSuccess(payload));
};


function* createAddressSaga(action){
    const addressData = _.get(action, 'payload', '');
    let payload = null;
    console.log("Address data: ", addressData);
    try{
        payload = yield call(createAddressApi, addressData);
    }
    catch(err){
        yield put(createAddressError(err));
        return null;
    };
    yield put(createAddressSuccess(payload));
};


export default function* AddressesSagaWatcher(){
    yield takeLatest(getAdressesInit, getAddressesSagaWorker);
    yield takeLatest(createAddressInit, createAddressSaga);
};
