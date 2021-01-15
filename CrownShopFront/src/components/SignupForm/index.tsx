//@ts-nocheck
import React, { useState, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import {
    createUserInitAction
} from './actions'

import './style.scss';
import '../../bootstrap/css/bootstrap.min.css';


const SignupForm: React.FunctionComponent = () => {
    let history = useHistory();
    const dispatch = useDispatch()

    const [signupInf, setSignupInf] = useState({
        username: '',
        email: '',
        password1: '',
        password2: '',
    })
    const signupState = useSelector(state => state.signUp);

    const handle_change = (e) => {
        const {name, value} = e.target
        setSignupInf({...signupInf, [name]: value})
    }

    const handle_signup = (e, data) => {
		e.preventDefault();
        console.log("Signup data: ",data);
        dispatch(createUserInitAction(data));
        history.push("/login");
	};


    return(
        <form className="_signup-form" onSubmit={e => handle_signup(e, signupInf)}>
            <h3 className="sign-up-child">SignUp</h3>
            <input
                className="sign-up-child form-control"
                type="text"
                name="username"
                value={signupInf.username}
                onChange={handle_change}
                placeholder="Username"
            />

            <input
                className="sign-up-child form-control"
                type="email"
                name="email"
                value={signupInf.email}
                onChange={handle_change}
                placeholder="Email"
            />

            <input
                className="sign-up-child form-control"
                type="password"
                name="password1"
                value={signupInf.password1}
                onChange={handle_change}
                placeholder="Password"
            />

            <input
                className="sign-up-child form-control"
                type="password"
                name="password2"
                value={signupInf.password2}
                onChange={handle_change}
                placeholder="Repeat Password"
            />
            <button className="btn btn-success sign-up-child" type="submit">SignUp</button>
        </form>
    );
};

export default SignupForm;