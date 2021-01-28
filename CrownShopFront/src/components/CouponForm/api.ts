//@ts-nocheck
import Promise from 'bluebird'; 
import axios from 'axios'; 


//login user
export const handleAddCouponApi = (coupon) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'POST',
            url: 'http://127.0.0.1:8000/api/add-coupon/',
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