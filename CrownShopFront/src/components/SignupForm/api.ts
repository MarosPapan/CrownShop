import Promise from 'bluebird'; 
import axios from 'axios'; 

import {registerUserUrl} from '../../constants';

// Handle SignUp API
export const handle_signup_api = (data) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'POST',
            url: registerUserUrl,
            headers: {
                'Content-Type': 'application/json'
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