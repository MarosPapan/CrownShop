//@ts-nocheck
import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
    logging: false, 
    logged: false,
    data: {},
    error: null,
}

const logInUserSlice = createSlice({
    name: 'logInUser',
    initialState,
    reducers: {
        userLogInInit: (state, {payload}) => {
            state.logging = true; 
            state.logged = false;
            state.data = {};
            state.error = null;
        },
        userLogInSuccess: (state, {payload}) => {
            state.logging = false; 
            state.logged = true;
            state.data = payload;
            state.error = null;
        },
        userLogInError: (state, {payload}) => {
            state.logging = false; 
            state.logged = false;
            state.data = {};
            state.error = payload;
        },
        userGetInit: (state) => {
            state.logging = true; 
            state.logged = false;
            state.data = {};
            state.error = null;
        },
        userLogOut: (state) => {
            state.logging = false; 
            state.logged = false;
            state.data = {};
            state.error = null;
        },
    },
});

export const { 
    userLogInInit, 
    userLogInSuccess,
    userLogInError, 
    userGetInit, 
    userLogOut,
 } = logInUserSlice.actions

export default logInUserSlice.reducer;

