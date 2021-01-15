import { combineReducers } from 'redux';

import signUpUserSlice from '../../components/SignupForm/signUpUserSlice';
import logInUserSlice from '../../components/LoginForm/logInUserSlice';
import getProductsSlice from '../../components/ProductList/getProductsSlice';
import addToCartSlice from '../../components/ProductList/addToCartSlice';
import getCartItemsSlice from "../../components/Cart/getCartItemsSlice";


const rootReducer = combineReducers({
    signUp: signUpUserSlice,
    login: logInUserSlice,
    products: getProductsSlice,
    addToCart: addToCartSlice,
    cart: getCartItemsSlice,
});

export default rootReducer;
