// @ts-nocheck
import Promise from 'bluebird'; 
import axios from 'axios'; 


// GET PRODUCTS IN CART
export const getCartItemsApi = () => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/api/order-summary/',
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }, 
        })
        .then((response) => {
            return resolve(response.data);
        })
        .catch((error) => {
            return reject(error);
        })
    });
};