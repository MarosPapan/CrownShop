// @ts-nocheck
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux"
import store from "./services/store/store"

import App from "./App/index";
import './style.scss'
import 'semantic-ui-css/semantic.min.css';


const rootEl = document.getElementById("root");

render(
    <Provider store={store}>
        <App />
    </Provider>,
     rootEl);
