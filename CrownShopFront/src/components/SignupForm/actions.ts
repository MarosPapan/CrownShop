import {
    INIT_CREATE_USER,
    INIT_ERROR_CREATE_USER, 
    CREATE_USER_SUCCESS,

} from "./constants";


export const createUserInitAction = (signupData) => {
    return {type: INIT_CREATE_USER, signupData}
};

export const createUserSuccessAction = (payload) => {
    return {type: CREATE_USER_SUCCESS, payload}
};


export const createUserErrorAction = (error) => {
    return {type: INIT_ERROR_CREATE_USER, error}
};