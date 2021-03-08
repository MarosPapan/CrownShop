// @ts-nocheck

export const localhost = "http://127.0.0.1:8000";

const apiURL = "/api"

export const endpoint = `${localhost}${apiURL}`;


// Associated with products
export const productListURL = `${endpoint}/product-list/`;
export const addToCartURL = `${endpoint}/add-to-cart/`;
export const productDettailURL = id => `${endpoint}/products/${id}/`;
export const orderSummaryURL =  `${endpoint}/order-summary/`;
export const orderItemDeleteURL = id => `${endpoint}/order-items/${id}/delete/`;
export const orderItemUpdateQuantityURL = `${endpoint}/order-items/update-quantity`;

// Url for payment
export const paymentURL =  `${endpoint}/payment/`;

// Url for coupon
export const addCouponURL = `${endpoint}/add-coupon/`;

//Url for Authentication
export const loginUrl = `${localhost}/jwt-token-auth/`;
export const currentUserUrl = `${localhost}/current_user/`;
export const registerUserUrl = `${localhost}/rest-auth/registration/`;


// Url associated with address
export const addressCreateURL = `${endpoint}/addresses/create/`;
export const addressUpdateURL = id => `${endpoint}/addresses/${id}/update/`;
export const addressDeleteURL = id => `${endpoint}/addresses/${id}/delete/`;

export const addressTypeURL = address_type => `${endpoint}/addresses/?address_type=${address_type}`;

// Countries

export const countryListUrl = `${endpoint}/countriesList`;

// UserID URl

export const userIdURL = `${endpoint}/userID/`;



