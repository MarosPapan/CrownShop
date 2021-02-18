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


// DELETE ITEM FROM CART

export const deleteCartItemApi = (data) => {
    console.log("ItemInf: ", data);
    return new Promise((resolve, reject) => {
        axios({
            method: 'delete',
            url: `http://127.0.0.1:8000/api/order-items/${data}/delete/`,
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
        })
    });
};

// REMOVE ONE ITEM FROM CART

export const removeOneItemFromCartApi = (slug) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/order-items/update-quantity',
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
        }) 
    })
}

