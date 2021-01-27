//@ts-nocheck
import { all, ForkEffect, AllEffect } from "redux-saga/effects";

import authenticationSaga from '../../components/SignupForm/saga';
import loginWatcherSaga from '../../components/LoginForm/saga';
import ProductsWatcherSaga from '../../components/ProductList/saga';
import CartWatcherSaga from "../../components/Cart/saga";
import paymentWatcherSaga from "../../pages/Payment/saga";

function* rootSaga(){
    yield all([
        authenticationSaga(),
        loginWatcherSaga(),
        ProductsWatcherSaga(),
        CartWatcherSaga(),
        paymentWatcherSaga(),
    ]);
}

export default rootSaga;