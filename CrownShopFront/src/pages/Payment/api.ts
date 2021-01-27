//@ts-nocheck
import Promise from 'bluebird'; 
import axios from 'axios'; 


//Payment
export const paymentApi = (token) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/payment/',
            data: {
                stripeToken: token,
            },
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }, 
        })
        .then((response) => {
            console.log("response in HANDLE ON PAY", response);
            return resolve(response.data)
        })
        .catch((error) => {
            console.log("Error with PAYMENT --> ", error);
            return reject(error);
        }); 
    });
};