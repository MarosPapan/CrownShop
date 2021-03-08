//@ts-nocheck
import Promise from 'bluebird'; 
import axios from 'axios'; 

import {
    paymentURL,
} from '../../constants';

//Payment
export const paymentApi = (paymentInf) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: paymentURL,
            data: {
                stripeToken: paymentInf[0],
                billingAddress: paymentInf[1],
                shippingAddress: paymentInf[2],
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