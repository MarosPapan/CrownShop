//@ts-nocheck
import Promise from 'bluebird'; 
import axios from 'axios'; 


//Payment
export const getDetailItemApi = (productID) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: `http://127.0.0.1:8000/api/products/${productID}/`,
        })
        .then((response) => {
            return resolve(response.data)
        })
        .catch((error) => {
            return reject(error);
        }); 
    });
};