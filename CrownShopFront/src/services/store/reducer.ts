import { combineReducers } from 'redux';

import signUpUserSlice from '../../components/SignupForm/signUpUserSlice';
import logInUserSlice from '../../components/LoginForm/logInUserSlice';
import getProductsSlice from '../../components/ProductList/getProductsSlice';
import addToCartSlice from '../../components/ProductList/addToCartSlice';
import getCartItemsSlice from "../../components/Cart/getCartItemsSlice";
import paymentSlice from "../../pages/Payment/paymentSlice";
import addCouponSlice from "../../components/CouponForm/addCouponSlice";
import getDetailProductSlice from '../../pages/ProductDetail/getDetailSlice';
import getAddressesSlice from '../../components/Profile/getAdressesSlice';
import createAddressSlice from '../../components/Profile/createAddressSlice';
import deleteCartItemSlice from '../../components/Cart/deleteCartItemSlice';
import removeOneItemFromCartSlice from '../../components/Cart/removeOneItemFromCartSlice';

const rootReducer = combineReducers({
    signUp: signUpUserSlice,
    login: logInUserSlice,
    products: getProductsSlice,
    addToCart: addToCartSlice,
    cart: getCartItemsSlice,
    payment: paymentSlice,
    coupon: addCouponSlice,
    detailProduct: getDetailProductSlice,
    Addresses: getAddressesSlice,
    CreateAddress: createAddressSlice,
    itemCartDelete: deleteCartItemSlice,
    removeOneItemFromCart: removeOneItemFromCartSlice,
});

export default rootReducer;
