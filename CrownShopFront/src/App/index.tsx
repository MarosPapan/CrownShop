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
import {Elements, CardElement} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import Homepage from "../pages/Homepage";
import Shop from "../pages/Shop";
import Checkout from "../pages/Checkout";
import Payment from "../pages/Payment";

import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";
import Nav from "../components/Nav";
import Footbar from "../components/Footbar";

import { userGetInit } from '../components/LoginForm/logInUserSlice';
import { getCartItemsStart } from '../components/Cart/getCartItemsSlice';

import "./style.scss"

const stripePromise = loadStripe('pk_test_51HnHArCYk4wmmfhvLrMmcXl2DbeY07P05wVmzorvJ3KaIHYQJJ695oBURUbM1MjFgPBHAufpnIfrsKnaAeAWPDkf007jlcIeWR');

const App: React.FunctionComponent = () => {

	const dispatch = useDispatch();

	const loggedIn = localStorage.getItem('token');
	const {logged} = useSelector(state => state.login);
	const {sended} = useSelector(state => state.coupon);

	useEffect(() => {
		if(loggedIn){
			dispatch(userGetInit());
		}
	}, []);

	useEffect(() => {
		if(logged){
			dispatch(getCartItemsStart());
		};
	}, [logged, sended]);

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
					<Route path="/checkout">
						<Checkout />
					</Route>
					<Route path="/payment" exact>
						<Elements stripe={stripePromise}>
							<Payment />
						</Elements>
					</Route>
				</Switch>
			<Footbar/>
			</div>
		</Router>
	);
};
export default App;
