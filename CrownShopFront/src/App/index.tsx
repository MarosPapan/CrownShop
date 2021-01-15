// @ts-nocheck
import React, { useState ,useEffect } from "react";
import { hot } from "react-hot-loader";
import { useSelector, useDispatch } from 'react-redux';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from 'react-router-dom'
import _ from "lodash";

import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";
import Nav from "../components/Nav";
import Homepage from "../pages/Homepage";
import Footbar from "../components/Footbar";
import Shop from "../pages/Shop";

import { userGetInit } from '../components/LoginForm/logInUserSlice';
import { getCartItemsStart } from '../components/Cart/getCartItemsSlice';

import "./style.scss"

const App: React.FunctionComponent = () => {
	const dispatch = useDispatch();

	const loggedIn = localStorage.getItem('token');
	const {logged} = useSelector(state => state.login);

	useEffect(() => {
		if(loggedIn){
			dispatch(userGetInit());
		}
	}, []);

	useEffect(() => {
		if(loggedIn){
			dispatch(getCartItemsStart());
		};
	}, [logged]);

	return(
		<Router>
			<div className="_app-wrap">
			<Nav/>
				<Switch className="_content">
					<Route path="/" exact>
						<Homepage/>
					</Route>
					<Route path="/login">
						<LoginForm />
					</Route>
					<Route path="/signup">
						<SignupForm/>
					</Route>
					<Route path="/shop">
						<Shop />
					</Route>
				</Switch>
			<Footbar/>
			</div>
		</Router>
	);
};
export default App;
