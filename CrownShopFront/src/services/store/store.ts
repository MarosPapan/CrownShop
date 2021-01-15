// @ts-nocheck
import { createStore, applyMiddleware, compose } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import createSagaMiddleware, { SagaMiddleware } from "redux-saga";

import rootReducer from './reducer';
import rootSaga from "../saga/index";

const sagaMiddleware = createSagaMiddleware();
const middleware = [
    ...getDefaultMiddleware({thunk: false}),
     sagaMiddleware
];

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;;

const store = configureStore({
    reducer: rootReducer,
    middleware,
});

sagaMiddleware.run(rootSaga);

export default store;