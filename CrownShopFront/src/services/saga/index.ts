//@ts-nocheck
import { all, ForkEffect, AllEffect } from "redux-saga/effects";

import authenticationSaga from '../../components/SignupForm/saga';
import loginWatcherSaga from '../../components/LoginForm/saga';
import ProductsWatcherSaga from '../../components/ProductList/saga';
import CartWatcherSaga from "../../components/Cart/saga";
import paymentWatcherSaga from "../../pages/Payment/saga";
import addCouponWatcherSaga from '../../components/CouponForm/saga';
import getProductDetailWatcherSaga from '../../pages/ProductDetail/saga';
import AddressesSagaWatcher from '../../components/Profile/saga';

function* rootSaga(){
    yield all([
        authenticationSaga(),
        loginWatcherSaga(),
        ProductsWatcherSaga(),
        CartWatcherSaga(),
        paymentWatcherSaga(),
        addCouponWatcherSaga(),
        getProductDetailWatcherSaga(),
        AddressesSagaWatcher(),
    ]);
};

export default rootSaga;