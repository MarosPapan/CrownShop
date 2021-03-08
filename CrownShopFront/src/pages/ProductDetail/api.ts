//@ts-nocheck
import Promise from 'bluebird'; 
import axios from 'axios'; 

import {
    productDettailURL
} from '../../constants';

//Payment
export const getDetailItemApi = (productID) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: productDettailURL(productID),
        })
        .then((response) => {
            return resolve(response.data)
        })
        .catch((error) => {
            return reject(error);
        }); 
    });
};