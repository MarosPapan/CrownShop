import {
    INIT_LOGIN_USER,
    INIT_ERROR_LOGIN_USER, 
    LOGIN_USER_SUCCESS,

} from "./constants";


export const loginUserInitAction = (loginData) => {
    return {type: INIT_LOGIN_USER, loginData}
};

export const loginUserSuccessAction = (payload) => {
    return {type: LOGIN_USER_SUCCESS, payload}
};


export const loginUserErrorAction = (error) => {
    return {type: INIT_ERROR_LOGIN_USER, error}
};