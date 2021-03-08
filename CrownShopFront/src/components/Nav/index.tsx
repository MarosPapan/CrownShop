// @ts-nocheck
import React, {Fragment, useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { 
    BrowserRouter as Router,
    Link,
    useHistory,
    userRouteMatch
 } from "react-router-dom";

 import { userLogOut } from '../../components/LoginForm/logInUserSlice';
 import { activeCategoryInit } from "../Categories/activeCategorySlice";

import crown from '../../assets/images/crown.svg';

import { 
    Icon,
	Dropdown,
} from 'semantic-ui-react';

import "./style.scss";

const Nav = (props) => {

    const dispatch = useDispatch();
	const history = useHistory();

    const {logged} = useSelector(state => state.login);
	const username = useSelector(state => _.get(state, 'login.data.username', ''));
    const {cart, loading} = useSelector(state => state.cart);

	const handle_logout = () => {
        localStorage.removeItem('token');
        dispatch(userLogOut());
		console.log("loggedOut");
    };

    const clickOnShop = () => {
        dispatch(activeCategoryInit(""));
    }
    
    const username = useSelector(state => _.get(state, 'login.data.username', ''));
    const {loading} = useSelector(state => state.cart);
    const {category} = useSelector(state => state.activeCategory);

    useEffect(() => {

    }, [category]);

    return (
        <div className="_navbar"> 
        <div className="_navbar-child">
            <Icon color="yellow" size="small" name="caret down"/>
            <Dropdown
            icon="list large yellow"
            >
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => clickOnShop()}>
                    <Link to='/products'>
                        <Icon name='shopping bag' />
                        Obchod
                    </Link>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        </div>
        <div className="_shop_icon _navbar-child">
        <Link 
        className="_remove-decoration-a" 
        to="/">
            <img src={crown} alt="Logo of website crown"/>
            {logged && (<div className="_user_name">{username}</div>)}
        </Link>
        </div>
        <div className="_exetends _navbar-child">
            <div className="extends-item">
            <Icon color="yellow" size="small" name="caret down"/>
            <Dropdown icon="users large yellow" className="_dropdown-menu">
                <Dropdown.Menu>
                {logged === false ? (
                    <>
                    <Dropdown.Item>
                        <Link to='/login'>
                            <Icon name='user' />
                            Prihlásiť sa
                        </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Link to="/signup">
                            <Icon name='user plus' />
                            Zaregistrovať sa
                        </Link>
                    </Dropdown.Item>
                    </>
                ) : (
                    <>
                    <Dropdown.Item>
                        <Link to='/profile'>
                            <Icon name='user' />
                            Profil
                        </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                    <Link 
                    to='/'
                    onClick={handle_logout}
                    >
                        <Icon name='user' />
                        Odhlásiť sa
                    </Link>
                </Dropdown.Item>
                    </>
                )}
                </Dropdown.Menu>
            </Dropdown>
            </div>
            {logged && (
                <>
                <div className="extends-item">
                    <Dropdown className="_dropdown-menu"
                        icon='shopping cart yellow large'
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
                            <Dropdown.Item>žiadny produkt v tvojom košíku</Dropdown.Item>
                        ) : null}
                        <Dropdown.Divider />
                        <Dropdown.Item icon="arrow right" text="Košík" onClick={() => {history.push("/checkout")}}/>
                    </Dropdown.Menu>
                    </Dropdown>
                </div>
                </>
            )}
        </div>
    </div>
    );
};

export default Nav;
