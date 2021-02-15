// @ts-nocheck
import React, {Fragment} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    BrowserRouter as Router,
    Link,
    useHistory,
    userRouteMatch
 } from "react-router-dom";

 import { userLogOut } from '../../components/LoginForm/logInUserSlice';
 import { 
    Icon,
    Dropdown, 
    Menu, 
    Divider,
    Item, 
    Header,
  } from 'semantic-ui-react';
import crown from '../../assets/images/crown.svg';
import "./style.scss";
import '../../bootstrap/css/bootstrap.min.css';



const Nav = (props) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const {cart} = useSelector(state => state.cart);

	const handle_logout = () => {
        localStorage.removeItem('token');
        dispatch(userLogOut());
        console.log("Logged out")
    };
    
    const username = useSelector(state => state.login.data.user);
    const {logged} = useSelector(state => state.login);
    const {loading} = useSelector(state => state.cart);

    return (
        <ul className="_navbar">

            <li className="_navbar-child">
                <Link className="_remove-decoration-a" to='/#'>ABOUT US</Link>
            </li>
            <>
                {logged ? (
                    <>
                    <li className="_navbar-child">
                        <Link className="_remove-decoration-a" to='/#'>CONTACT US</Link>
                    </li>
                    </>
                ) : null}
            </>
            <li className="_navbar-child">
                <Link className="_remove-decoration-a" to='/products'>SHOP</Link>
            </li>

            <li className="_navbar-child homepage-link">
                <Link className="_remove-decoration-a" to="/"><img src={crown} alt="Logo of website crown"/></Link>
            </li>
            <>
                {logged ? (
                    <>
                        <li className="_navbar-child nav-link disabled">??</li>
                        <li className="_navbar-child" onClick={handle_logout}>LOGOUT</li>
                        <li className="_navbar-child">
                            <Link className="_remove-decoration-a" to="/profile">PROFILE</Link>
                        </li>
                        <li>
                        <Menu.Menu position='right'>
                            <Dropdown
                                icon='shopping cart'
                                loading={loading} 
                                text={`${cart !== null ? cart.order_items.length : 0}`} 
                                pointing 
                                className='link item'
                            >
                            <Dropdown.Menu>
                                {cart && cart.order_items.map(order_item => {
                                    return (
                                    <Dropdown.Item key={order_item.id}>
                                        {order_item.quantity} x {order_item.item.title}
                                    </Dropdown.Item> 
                                );
                                })}
                                {cart && cart.order_items.length < 1 ? (
                                    <Dropdown.Item>No items in your cart</Dropdown.Item>
                                ) : null}
                                <Dropdown.Divider />
                                <Dropdown.Item icon="arrow right" text="Checkout" onClick={() => {history.push("/checkout")}}/>
                            </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Menu>
                        </li>
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
        </ul>
    );
};

export default Nav;
