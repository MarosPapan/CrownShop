// @ts-nocheck
import { getUser } from 'App/api';
import React, {Fragment} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    BrowserRouter as Router,
    Link,
 } from "react-router-dom";

 import { userLoggedInFail } from '../../App/userInfReducer';
 import { 
    Button, 
    Container, 
    Icon, 
    Image, 
    Item, 
    Label, 
    Dimmer, 
    Segment, 
    Loader, 
    Message 
  } from 'semantic-ui-react';
import crown from '../../assets/images/crown.svg';
import "./style.scss";
import '../../bootstrap/css/bootstrap.min.css';



const Nav = (props) => {
    const dispatch = useDispatch();
    const {cart} = useSelector(state => state.cart);

	const handle_logout = () => {
        localStorage.removeItem('token');
        dispatch(userLoggedInFail());
        console.log("Logged out")
    };
    
    const {isLoggedIn} = useSelector(state => state.userInf);
    const {username} = useSelector(state => state.userInf);
    console.log("If user is logged in: ", )

    return (
        <ul className="_navbar">

            <li className="_navbar-child">
                <Link className="_remove-decoration-a" to='/#'>ABOUT US</Link>
            </li>

            <li className="_navbar-child">
                <Link className="_remove-decoration-a" to='/#'>CONTACT US</Link>
            </li>

            <li className="_navbar-child">
                <Link className="_remove-decoration-a" to='/shop'>SHOP</Link>
            </li>

            <li className="_navbar-child homepage-link">
                <Link className="_remove-decoration-a" to="/"><img src={crown} alt="Logo of website crown"/></Link>
            </li>
            <>
                {isLoggedIn ? (
                    <>
                        <li className="_navbar-child nav-link disabled">{username}</li>
                        <li className="_navbar-child" onClick={handle_logout}>LOGOUT</li>
                    </>
                ): (
                    <>
                    <li className="_navbar-child">
                        <Link className="_remove-decoration-a" to='/login'>LOGIN</Link>
                     </li>
            
                    <li className="_navbar-child">
                        <Link className="_remove-decoration-a" to="/signup">SIGNUP</Link>
                    </li>
                    </>
                )}
            </>
            <li className="_navbar-child homepage-link">
                <Link className="_remove-decoration-a" to="/"><Icon name='shopping cart' /></Link>
            </li>
        </ul>
    );
};

export default Nav;