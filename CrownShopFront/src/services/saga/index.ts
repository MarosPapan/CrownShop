//@ts-nocheck
import { all, ForkEffect, AllEffect } from "redux-saga/effects";

import getUserWatcherSaga from '../../App/saga'
import authenticationSaga from '../../components/SignupForm/saga';
import loginWatcherSaga from '../../components/LoginForm/saga';
import ProductsWatcherSaga from '../../components/ProductList/saga';
import CartWatcherSaga from "../../components/Cart/saga";

function* rootSaga(){
    yield all([
        authenticationSaga(),
        loginWatcherSaga(),
        getUserWatcherSaga(),
        ProductsWatcherSaga(),
        CartWatcherSaga(),
    ]);
}

export default rootSaga;