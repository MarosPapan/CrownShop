import Promise from 'bluebird'; 
import axios from 'axios'; 


// Handle SignUp API
export const handle_signup_api = (data) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'POST',
            url: 'http://127.0.0.1:8000/rest-auth/registration/',
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