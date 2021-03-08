//@ts-nocheck
import Promise from 'bluebird'; 
import axios from 'axios'; 

import {
    loginUrl,
    currentUserUrl,
} from '../../constants';

//login user
export const handle_login_api = (data) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'POST',
            url: loginUrl,
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        })
        .then((response) => {
            localStorage.setItem('token', response.data.token);
            return resolve(response.data);
        })
        .catch((error) => {
            return reject(error);
        });
    });
};

//Get User
export const getUserApi = () => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: currentUserUrl,
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            },
        })
        .then((response) => {
            return resolve(response.data)
        })
        .catch((error) => {
            return reject(error)
        })
    });
};