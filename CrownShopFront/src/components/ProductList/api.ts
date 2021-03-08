//@ts-nocheck
import Promise from 'bluebird'; 
import axios from 'axios'; 

import { 
    productListURL,
    addToCartURL,
 } from '../../constants';

// GET ALL PRODUCTS
export const getProductsApi = () => {
    console.log("This is URL of product list: ", productListURL)
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: productListURL,
        })
        .then((response) => {
            return resolve(response.data);
        })
        .catch((error) => {
            return reject(error);
        })
    });
};

//ADD TO CART API
export const addToCartApi = (product_inf) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: addToCartURL,
            data: {
                slug: product_inf[0],
                variations: product_inf[1],
            },
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }, 
        })
        .then((response) => {
            return resolve(response.data)
        })
        .catch((error) => {
            return reject(error);
        }) 
    })
}
