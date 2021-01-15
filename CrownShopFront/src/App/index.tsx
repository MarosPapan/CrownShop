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

import { userGetInit } from './getUserReducer';
import { userLoggedInFail, userLoggedInSuccess } from './userInfReducer';
import { getCartItemsStart } from '../components/Cart/getCartItemsSlice';

import "./style.scss"

const App: React.FunctionComponent = () => {
	const dispatch = useDispatch();
	const {isLoggedIn} = useSelector(state => state.userInf);

	const loggedIn = localStorage.getItem('token');

	useEffect(() => {
		if(loggedIn){
			dispatch(userGetInit());
		}
	}, [userLoggedInSuccess, isLoggedIn, dispatch]);

	useEffect(() => {
		if(isLoggedIn){
			dispatch(getCartItemsStart());
		}
	}, [isLoggedIn]);

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
