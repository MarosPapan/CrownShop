//@ts-nocheck
import Promise from 'bluebird'; 
import axios from 'axios'; 

import {
    addCouponURL,
} from '../../constants';

//login user
export const handleAddCouponApi = (coupon) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'POST',
            url: addCouponURL,
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            },
            data: {
                code: coupon,
            }
        })
        .then((response) => {
            return resolve(response.data);
        })
        .catch((error) => {
            return reject(error);
        });
    });
};