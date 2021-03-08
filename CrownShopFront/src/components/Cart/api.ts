// @ts-nocheck
import Promise from 'bluebird'; 
import axios from 'axios'; 

import {
    orderSummaryURL,
    orderItemDeleteURL,
    orderItemUpdateQuantityURL,
} from '../../constants';

// GET PRODUCTS IN CART
export const getCartItemsApi = () => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: orderSummaryURL,
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }, 
        })
        .then((response) => {
            return resolve(response.data);
        })
        .catch((error) => {
            return reject(error);
        });
    });
};


// DELETE ITEM FROM CART

export const deleteCartItemApi = (data) => {
    console.log("ItemInf: ", data);
    return new Promise((resolve, reject) => {
        axios({
            method: 'delete',
            url: orderItemDeleteURL(data),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `JWT ${localStorage.getItem('token')}`
            },
            data: JSON.stringify(data)
        })
        .then((response) => {
            return resolve(response.data);
        })
        .catch((error) => {
            return reject(error)
        });
    });
};

// REMOVE ONE ITEM FROM CART

export const removeOneItemFromCartApi = (slug) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: orderItemUpdateQuantityURL,
            data: {
                slug: slug,
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
        }); 
    });
};

