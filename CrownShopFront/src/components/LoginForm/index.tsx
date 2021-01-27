import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

import { userLogInInit } from './logInUserSlice';
import { getCartItemsStart } from '../Cart/getCartItemsSlice';

import './style.scss';
import '../../bootstrap/css/bootstrap.min.css';

const LoginForm = (props) => {
    const dispatch = useDispatch()
    let history = useHistory()

    // @ts-ignore
    const logIn = useSelector(state => state.login);

    const [loginInf, setLoginInf] = useState({
        username: '',
        password: '',
    })

    const handle_change = (e) => {
        const {name, value} = e.target;
        setLoginInf({...loginInf, [name]: value});
    };

    const handleLogin = (e, data) => {
        e.preventDefault();
        dispatch(userLogInInit(data));
        history.push("/");
        
    };

    return(
        <form className="_login-form" onSubmit={e => handleLogin(e, loginInf)}>
            <h3 className="_child-login-form">Log In</h3>
            <input
                className="_child-login-form form-control login-username-password"
                type="text"
                name="username"
                value={loginInf.username}
                onChange={handle_change}
                placeholder="Username"
            />

            <input
                className="_child-login-form form-control login-username-password"
                type="password"
                name="password"
                value={loginInf.password}
                onChange={handle_change}
                placeholder="Password"
            />
            <button className="_child-login-form btn btn-success"  type="submit">Log In</button>
        </form>

    )
}

export default LoginForm;