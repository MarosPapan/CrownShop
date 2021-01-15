import Promise from 'bluebird'; 
import axios from 'axios'; 

export const handle_login_api = (data) => {
    return new Promise((resolve, reject) => {
        // @ts-ignore
        axios({
            method: 'POST',
            url: 'http://127.0.0.1:8000/jwt-token-auth/',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        })
        .then((response) => {
            localStorage.setItem('token', response.data.token);
            console.log("This is response in LOGIN: ", response);
            return resolve(response.data);
        })
        .catch((error) => {
            console.log("This is error in LOGIN: ", error);
            return reject(error);
        });
    });
};