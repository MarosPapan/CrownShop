import { combineReducers } from 'redux';

import signUpReducer from '../../components/SignupForm/signUpReducer';
import loginReducer from '../../components/LoginForm/loginReducer';
import getUserReducer from '../../App/getUserReducer';
import userInfReducer from '../../App/userInfReducer';
import getProductsSlice from '../../components/ProductList/getProductsSlice';
import addToCartSlice from '../../components/ProductList/addToCartSlice';
import getCartItemsSlice from "../../components/Cart/getCartItemsSlice";


const rootReducer = combineReducers({
    signUp: signUpReducer,
    login: loginReducer,
    getUser: getUserReducer,
    userInf: userInfReducer,
    products: getProductsSlice,
    addToCart: addToCartSlice,
    cart: getCartItemsSlice,
});

export default rootReducer;
