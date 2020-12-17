import { createStore, applyMiddleware, compose } from 'redux';

import createSagaMiddleware, { SagaMiddleware } from "redux-saga";

import rootReducer from './reducer';
import rootSaga from "../saga/index";

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers =
  (process.env.NODE_ENV !== "production" &&
    window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"]) ||
  compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;