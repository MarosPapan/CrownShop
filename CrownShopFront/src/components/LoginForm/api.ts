//@ts-nocheck
import Promise from 'bluebird'; 
import axios from 'axios'; 


//login user
export const handle_login_api = (data) => {
    return new Promise((resolve, reject) => {
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
            console.log("This is response in LOGIN: ", response.data);
            return resolve(response.data);
        })
        .catch((error) => {
            console.log("This is error in LOGIN: ", error);
            return reject(error);
        });
    });
};

//Get User
export const getUserApi = () => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/current_user/',
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            },
        })
        .then((response) => {
            console.log("THIS IS RESPONSE IN GETUSER API -->: ", response)
            return resolve(response.data)
        })
        .catch((error) => {
            return reject(error)
        })
    });
};