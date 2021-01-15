//@ts-nocheck
import Promise from 'bluebird'; 
import axios from 'axios'; 

// GET ALL PRODUCTS
export const getProductsApi = () => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/api/product-list/',
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
export const addToCartApi = (slug) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/add-to-cart/',
            data: {
                slug: slug,
            },
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }, 
        })
        .then((response) => {
            console.log("THIS IS RESPONSE IN ADD TO CART API --> ", response);
            return resolve(response.data)
        })
        .catch((error) => {
            console.log("THIS IS ERROR IN ADD TO CART API --> ", error);
            return reject(error);
        }) 
    })
}
