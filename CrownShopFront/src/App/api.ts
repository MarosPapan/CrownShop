//@ts-nocheck
import Promise from 'bluebird'; 
import axios from 'axios'; 

export const getUser = () => {
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