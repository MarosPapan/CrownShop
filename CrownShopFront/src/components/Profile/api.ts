//@ts-nocheck
import Promise from 'bluebird'; 
import axios from 'axios'; 

// GET ADDRESSES
export const getAddressesApi = (address_type) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: `http://127.0.0.1:8000/api/addresses/?address_type=${address_type}`,
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

// CREATE ADDRESS

export const createAddressApi = (data) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'POST',
            url: 'http://127.0.0.1:8000/api/addresses/create/',
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